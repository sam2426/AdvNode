/**
 * This file is to be run independently, and not from the project.
 */

class Page {
    goto() { console.log("I am going to another page."); }
    setCookie() { console.log("I am setting a cookie."); }
}

//#region In this section, we saw that by creating the custom class with main class being passed in the constructor, it will work, but then we will be required to use customPage.page to use other inner functions. 
class CustomPage {
    constructor(page){
        this.page = page;
    }
    login(){
        this.page.goto('localhost:3000');
        this.page.setCookie();
    }
}
// const page = browser.launch(); /** in original app, we use like this to create the page. */
const page = new Page();
const customPage = new CustomPage(page);

customPage.login();
customPage.page.goto();
//#endregion

