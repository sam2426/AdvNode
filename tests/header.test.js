const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await browser.close();
});

test('The header has a correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual("Blogster");
});

test('clicking login start oAuth flow', async () => {
    await page.click('.right a');

    const url = await page.url();
    expect(url).toMatch(/https:\/\/accounts\.google\.com/);
});

test('when signed in, shows logout button', async()=>{
    const id = '64b5eb34a71ca02535496e3b';

    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        } 
    };

    const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

    const Keygrip = require('keygrip');
    const keys = require('../config/keys');

    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);
    await page.setCookie({name: 'session', value: sessionString});
    await page.setCookie({name: 'session.sig', value: sig});
    // await page.goto('http://localhost:3000');
    await page.reload();
    await page.waitForSelector('a[href="/auth/logouter"]');
    const logoutText = await page.$eval('a[href="/auth/logouter"]', el=> el.innerHTML);
    expect(logoutText).toEqual('Logout');
});