const { Given, When, Then } = require('@cucumber/cucumber');
const { PageObjectManager } = require('../../pageObjects/PageObjectManager')
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

Given('login to the application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    this.loginPage = this.pageObjectManager.getLoginPageObj();
    await this.loginPage.goToLoginPage();
    await this.loginPage.validLogin(username, password);
});


When('Add {string} to the cart', async function (productName) {
    this.dashboardPage = this.pageObjectManager.getdashboardPageObj();
    await this.dashboardPage.addProductToCart(productName);
    //click on the cart and check if your product has been added
    await this.dashboardPage.navigateToCartPage(productName);

});

Then('Verify {string} is displayed in the Cart page', async function (productName) {
    this.mycartPage = this.pageObjectManager.getmyCartPageObj();
    const isProductPresent = await this.mycartPage.isProductVisible(productName);
    expect(isProductPresent).toBeTruthy();
});

When('Enter valid details and Place the order', async function () {
    this.thankyouPage = this.pageObjectManager.getthankyouPageObj();
    this.checkoutPage = this.pageObjectManager.getcheckoutPageObj();
    //checkout
    await this.mycartPage.navigateToCheckoutPage();
    //select country- checkout page
    await this.checkoutPage.selectCountry("India", "ind")
    //Thankyou page - get order id
    await this.checkoutPage.navigateToThankyouPage();
    //ThankyouPage assertion
    await expect(this.thankyouPage.thankyouText).toHaveText(" Thankyou for the order. ");
    this.orderId = await this.thankyouPage.getOrderId();
});


Then('Verify Order Present in OrderHistoryPage', async function () {
    this.orderHistoryPage = this.pageObjectManager.getorderHistoryPageObj();
    this.orderSummaryPage = this.pageObjectManager.getorderSummaryPageObj();

    await this.thankyouPage.navigateToOrderHistoryPage();
    await this.orderHistoryPage.viewYourOrder(this.orderId);

    //verify order summary - order summary page
    const orderIdDetails = await this.orderSummaryPage.getOrderIdDetails();
    expect(this.orderId.includes(orderIdDetails)).toBeTruthy();

});

Given('login to the application2 with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName = this.page.locator('#username')
    const pwd = this.page.locator("input[name='password']")
    const loginBtn = this.page.locator("#signInBtn")
    await userName.fill(username)
    await pwd.fill(password)
    await loginBtn.click()

});

Then('Verify error message is displayed', async function () {
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
});
