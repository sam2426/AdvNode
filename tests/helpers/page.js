const puppeteer = require('puppeteer');
const userFactory = require('../factories/userFactory');
const sessionFactory = require('../factories/sessionFactory');

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: (target, property, receiver) => {
              if (target[property]) {
                return target[property];
              }
       
              let value = browser[property];
              if (value instanceof Function) {
                return function (...args) {
                  return value.apply(this === receiver ? browser : this, args);
                };
              }
       
              value = page[property];
              if (value instanceof Function) {
                return function (...args) {
                  return value.apply(this === receiver ? page : this, args);
                };
              }
       
              return value;
            },
          });
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        const user = await userFactory();
        const {session, sig} = sessionFactory(user);
        await this.page.setCookie({name: 'session', value: session});
        await this.page.setCookie({name: 'session.sig', value: sig});
        // await this.page.goto('http://localhost:3000');
        await this.page.reload();
        await this.page.waitForSelector('a[href="/auth/logouter"]');
    }

    async getContentsOf(selector){
        return await this.page.$eval(selector, el => el.innerHTML);
    }
}

module.exports = CustomPage;