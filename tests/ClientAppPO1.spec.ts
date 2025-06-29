import {test,expect} from '@playwright/test';
import { PageObjectManager } from '../pageObjects_ts/PageObjectManager';
import {customTest} from '../utils_ts/test-base';

//json to string to js object : to avoid failure during parsing due to encoding standards
import placeOrderDataSetJsonObj from '../utils_ts/PlaceOrder.json';
const placeOrderDataSetStringFormat = JSON.stringify(placeOrderDataSetJsonObj)
const placeOrderDataSet = JSON.parse(placeOrderDataSetStringFormat)

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
test('@UI end to end flow for e commerce web site',async ({page})=>{
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPageObj();
    const dashboardPage = pageObjectManager.getdashboardPageObj();
    const mycartPage = pageObjectManager.getmyCartPageObj();
    const checkoutPage = pageObjectManager.getcheckoutPageObj();
    const thankyouPage = pageObjectManager.getthankyouPageObj();
    const orderHistoryPage = pageObjectManager.getorderHistoryPageObj();
    const orderSummaryPage = pageObjectManager.getorderSummaryPageObj();

    await loginPage.goToLoginPage();
    console.log("placeOrderDataSet.password : placeOrderDataSet.password",placeOrderDataSet.password);
    await loginPage.validLogin(placeOrderDataSet.email,placeOrderDataSet.password);
    await dashboardPage.addProductToCart(placeOrderDataSet.productName);


    //click on the cart and check if your product has been added
    await dashboardPage.navigateToCartPage(placeOrderDataSet.productName);
    const isProductPresent = await mycartPage.isProductVisible(placeOrderDataSet.productName);
    expect(isProductPresent).toBeTruthy();

    //checkout
    await mycartPage.navigateToCheckoutPage();
   
    //select country- checkout page
    await checkoutPage.selectCountry("India","ind")


    //enter checkout information - checkout page
    await checkoutPage.enterPaymentInformation(placeOrderDataSet.creditCardNumber,placeOrderDataSet.creditCardCVV,placeOrderDataSet.creditCardUserName,placeOrderDataSet.creditCardExpiryDate,placeOrderDataSet.creditCardExpiryMonth);


    //assert shipping information - checkout page
    const emailIdGreyed = await checkoutPage.getGreyedEmailId();
    expect(placeOrderDataSet.email).toBe(emailIdGreyed);
    const actualUserNameEmailId = await checkoutPage.getUsernameEmailId();
    expect(actualUserNameEmailId).toContain(placeOrderDataSet.email);
    
    //Thankyou page - get order id
   checkoutPage.navigateToThankyouPage();

   //ThankyouPage assertion
   await expect(thankyouPage.thankyouText).toHaveText(" Thankyou for the order. ");
   const orderId:any = await thankyouPage.getOrderId();

   //Go to prders page and verify your order
   await thankyouPage.navigateToOrderHistoryPage();

  
   await orderHistoryPage.viewYourOrder(orderId);

 //verify order summary - order summary page
 const orderIdDetails = await orderSummaryPage.getOrderIdDetails();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();

 const addressSummaryDeatils:any = await orderSummaryPage.getAddressSummary();

 expect(addressSummaryDeatils.billingEmail.includes(placeOrderDataSet.email)).toBeTruthy();
 expect(addressSummaryDeatils.deliveryEmail.includes(placeOrderDataSet.email)).toBeTruthy();
   expect(addressSummaryDeatils.billingCountry.includes("India")).toBeTruthy();
expect(addressSummaryDeatils.deliveryCountry.includes("India")).toBeTruthy();

 const productNameFromSummary:any = await orderSummaryPage.getProductName();
expect(productNameFromSummary.trim()).toBe(placeOrderDataSet.productName);


});

         /**
           * FIXTURE
           * applicable only for test with one data set
           * cant use it if test needs different set of test data
           */

customTest('USAGE OF FIXTURE EXAMPLE',async ({page,testDataForOrder})=>{
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPageObj();
    const dashboardPage = pageObjectManager.getdashboardPageObj();
    const mycartPage = pageObjectManager.getmyCartPageObj();
    
    await loginPage.goToLoginPage();
    await loginPage.validLogin(testDataForOrder.email,testDataForOrder.password);
    await dashboardPage.addProductToCart(testDataForOrder.productName);
   
    //await expect(page.locator('text=Product Added To Cart')).toBeVisible();


    //click on the cart and check if your product has been added
    await dashboardPage.navigateToCartPage(testDataForOrder.productName);
    const isProductPresent = await mycartPage.isProductVisible(testDataForOrder.productName);
    expect(isProductPresent).toBeTruthy();

});