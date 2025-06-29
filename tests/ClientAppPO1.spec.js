"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const PageObjectManager_1 = require("../pageObjects_ts/PageObjectManager");
const test_base_1 = require("../utils_ts/test-base");
//json to string to js object : to avoid failure during parsing due to encoding standards
const PlaceOrder_json_1 = __importDefault(require("../utils_ts/PlaceOrder.json"));
const placeOrderDataSetStringFormat = JSON.stringify(PlaceOrder_json_1.default);
const placeOrderDataSet = JSON.parse(placeOrderDataSetStringFormat);
/**
 * PARAMETERIZATION :  run the test with different set of test data dynamically
 * 1. give test data in JSON file in array format, for example
 *        [
            {
              "email":"priyanka.gautam1905@gmail.com",
              "password":"$$$$$$$$$$",
                and so on....
            },
            {
                "email":"otherTestUserData@gmail.com",
                 "password":"$$$$$$$$$$",
                 and so on...
              }
          ]
 *
 *
 * 2. place your test in for loop , for example :
 *      for(const data of placeOrderDataSet){
 *          test(`end to end flow for e commerce web site for ${data.productName}`,async ({page})=>{
 *              your test steps....
 *              3. access your properties using data variable
 *                  instead of using placeOrderDataSet.email
 *                  use data.email
 *
 *            });
 *      }
 *
 *
 *  4. somehow we have to make test name different for different testdata otherwise playwright will say that we have same name tests
 *      hence we are using ${data.productName} in the test name
 *
 */
/**
 * ABOUT TEST STEPS
 * login
 * select product named - Zara Coat 3
 * Assert if the required product has been selected and present in the cart
 * Add it to the cart
 * Assert your details on checkout page
 * complete the checkout process
 * Go to order history page
 * Search for your order using order id
 *
 */
(0, test_1.test)('@UI end to end flow for e commerce web site', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const pageObjectManager = new PageObjectManager_1.PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPageObj();
    const dashboardPage = pageObjectManager.getdashboardPageObj();
    const mycartPage = pageObjectManager.getmyCartPageObj();
    const checkoutPage = pageObjectManager.getcheckoutPageObj();
    const thankyouPage = pageObjectManager.getthankyouPageObj();
    const orderHistoryPage = pageObjectManager.getorderHistoryPageObj();
    const orderSummaryPage = pageObjectManager.getorderSummaryPageObj();
    yield loginPage.goToLoginPage();
    console.log("placeOrderDataSet.password : placeOrderDataSet.password", placeOrderDataSet.password);
    yield loginPage.validLogin(placeOrderDataSet.email, placeOrderDataSet.password);
    yield dashboardPage.addProductToCart(placeOrderDataSet.productName);
    //click on the cart and check if your product has been added
    yield dashboardPage.navigateToCartPage(placeOrderDataSet.productName);
    const isProductPresent = yield mycartPage.isProductVisible(placeOrderDataSet.productName);
    (0, test_1.expect)(isProductPresent).toBeTruthy();
    //checkout
    yield mycartPage.navigateToCheckoutPage();
    //select country- checkout page
    yield checkoutPage.selectCountry("India", "ind");
    //enter checkout information - checkout page
    yield checkoutPage.enterPaymentInformation(placeOrderDataSet.creditCardNumber, placeOrderDataSet.creditCardCVV, placeOrderDataSet.creditCardUserName, placeOrderDataSet.creditCardExpiryDate, placeOrderDataSet.creditCardExpiryMonth);
    //assert shipping information - checkout page
    const emailIdGreyed = yield checkoutPage.getGreyedEmailId();
    (0, test_1.expect)(placeOrderDataSet.email).toBe(emailIdGreyed);
    const actualUserNameEmailId = yield checkoutPage.getUsernameEmailId();
    (0, test_1.expect)(actualUserNameEmailId).toContain(placeOrderDataSet.email);
    //Thankyou page - get order id
    checkoutPage.navigateToThankyouPage();
    //ThankyouPage assertion
    yield (0, test_1.expect)(thankyouPage.thankyouText).toHaveText(" Thankyou for the order. ");
    const orderId = yield thankyouPage.getOrderId();
    //Go to prders page and verify your order
    yield thankyouPage.navigateToOrderHistoryPage();
    yield orderHistoryPage.viewYourOrder(orderId);
    //verify order summary - order summary page
    const orderIdDetails = yield orderSummaryPage.getOrderIdDetails();
    (0, test_1.expect)(orderId.includes(orderIdDetails)).toBeTruthy();
    const addressSummaryDeatils = yield orderSummaryPage.getAddressSummary();
    (0, test_1.expect)(addressSummaryDeatils.billingEmail.includes(placeOrderDataSet.email)).toBeTruthy();
    (0, test_1.expect)(addressSummaryDeatils.deliveryEmail.includes(placeOrderDataSet.email)).toBeTruthy();
    (0, test_1.expect)(addressSummaryDeatils.billingCountry.includes("India")).toBeTruthy();
    (0, test_1.expect)(addressSummaryDeatils.deliveryCountry.includes("India")).toBeTruthy();
    const productNameFromSummary = yield orderSummaryPage.getProductName();
    (0, test_1.expect)(productNameFromSummary.trim()).toBe(placeOrderDataSet.productName);
}));
/**
  * FIXTURE
  * applicable only for test with one data set
  * cant use it if test needs different set of test data
  */
(0, test_base_1.customTest)('USAGE OF FIXTURE EXAMPLE', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, testDataForOrder }) {
    const pageObjectManager = new PageObjectManager_1.PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPageObj();
    const dashboardPage = pageObjectManager.getdashboardPageObj();
    const mycartPage = pageObjectManager.getmyCartPageObj();
    yield loginPage.goToLoginPage();
    yield loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
    yield dashboardPage.addProductToCart(testDataForOrder.productName);
    //await expect(page.locator('text=Product Added To Cart')).toBeVisible();
    //click on the cart and check if your product has been added
    yield dashboardPage.navigateToCartPage(testDataForOrder.productName);
    const isProductPresent = yield mycartPage.isProductVisible(testDataForOrder.productName);
    (0, test_1.expect)(isProductPresent).toBeTruthy();
}));
