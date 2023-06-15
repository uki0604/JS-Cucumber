const { Given, When, Then } = require('@cucumber/cucumber')
const BasePage = require('../pages/base.page');

When('Customer clicks button as {string}',  async(button) =>  {
    const elem = await $("//*[contains(text(),'"+button+"')]")
    await elem.waitForDisplayed();
    await elem.click();
})

When('Customer accepts Alert', async() => {
    await browser.pause(6000);
    await browser.acceptAlert();
    await browser.pause(3000); 
})


