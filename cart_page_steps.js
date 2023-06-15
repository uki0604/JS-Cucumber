const { Given, When, Then } = require('@cucumber/cucumber')
const MainPage = require('../pages/main.page');
const ProductPage = require('../pages/product.page');
const CartPage = require('../pages/cart.page');

const assert = require("assert");

When('Customer deletes index as {string} products as {string}',  async(index, products) => {
    await browser.pause(2000);
    ind = parseInt(index) - 1
    product = await products.split(",")[ind]
    
    first_element_in_basket = await $(CartPage.firstElementInBasket);
    second_element_in_basket = await $(CartPage.secondElementInBasket);

    await console.log(product);
    txt1 = await first_element_in_basket.getText();
    txt2 = await second_element_in_basket.getText();
    await console.log(txt1);
    await console.log(txt2);

    if(product.includes(txt2)) {

        // normally the laptop picked last time (Dell i7 8gb) is the 2nd element in the list

        await CartPage.pressButtonWithLocator(CartPage.deleteSecondElementButton)
    }
    else if(product.includes(txt1)) {

        // but it can happen, that the laptop picked last time is on the top of the basket (first element in the list)
  
        await CartPage.pressButtonWithLocator(CartPage.deleteFirstElementButton)
    }


    await browser.pause(2000);
})

When('Customer fills in field Name as {string}',  async(name) => {
    await CartPage.fillInEditBox("//*[@id='name']",name)
})

When('Customer fills in field Country as {string}',  async(country) => {
    await CartPage.fillInEditBox("//*[@id='country']",country)
})

When('Customer fills in field City as {string}',  async(city) => {
    await CartPage.fillInEditBox("//*[@id='city']",city)
})

When('Customer fills in field Card as {string}',  async(card) => {
    await CartPage.fillInEditBox("//*[@id='card']",card)
})

When('Customer fills in field Month as {string}',  async(month) => {
    await CartPage.fillInEditBox("//*[@id='month']",month)
})

When('Customer fills in field Year as {string}',  async(year) => {
    await CartPage.fillInEditBox("//*[@id='year']",year)
})

When('Customer clicks Purchase Button',  async() => {
    await CartPage.pressButtonWithLocator(CartPage.purchaseButton)
})

When('Customer clicks Close button',  async() => {
    await CartPage.pressButtonWithLocator(CartPage.closeButton);
})

Then('Match index as {string} prices as {string} with purchased amount', async(index,prices) => {

    // all the prices are input parameters, the price for the product is indexed in the list of price_of_laptops

    ind = parseInt(index) - 1
    price = await prices.split(",")[ind]   
    const elem = await $(CartPage.priceRow);
    await elem.waitForDisplayed();
    str = await elem.getText();  
    str = await str.substring(str.indexOf('Amount'),str.indexOf('Card Number'));
    await console.log(str);
    await console.log(price);

    // make the price comparison  
    assert(str.includes(price))
})