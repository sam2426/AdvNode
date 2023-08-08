const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await page.close();
});

test('The header has a correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual("Blogster");
});

test('clicking login start oAuth flow', async () => {
    await page.click('.right a');

    const url = await page.url();
    expect(url).toMatch(/https:\/\/accounts\.google\.com/);
});

test('when signed in, shows logout button', async()=>{ 
    await page.login();
    const logoutText = await page.getContentsOf('a[href="/auth/logouter"]');
    console.log(logoutText, "logoutText");
    expect(logoutText).toEqual('Logout');
});