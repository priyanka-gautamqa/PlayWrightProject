const {test,expect} = require('@playwright/test')
const {PageObjectManager} = require('../pageObjects/PageObjectManager')


/**
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
test('end to end flow for e commerce web site',async ({page})=>{

    const productName = 'ZARA COAT 3';
    const email='priyanka.gautam1905@gmail.com';
    const password = "$$$$$$$$$$$$$$$$$$$$$"; 
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPageObj();
    const dashboardPage = pageObjectManager.getdashboardPageObj();
    const mycartPage = pageObjectManager.getmyCartPageObj();
    const checkoutPage = pageObjectManager.getcheckoutPageObj();
    const thankyouPage = pageObjectManager.getthankyouPageObj();
    const orderHistoryPage = pageObjectManager.getorderHistoryPageObj();
    const orderSummaryPage = pageObjectManager.getorderSummaryPageObj();

    await loginPage.goToLoginPage();
    await loginPage.validLogin(email,password);
    await dashboardPage.addProductToCart(productName);


    //click on the cart and check if your product has been added
    await dashboardPage.navigateToCartPage();
    const isProductPresent = await mycartPage.isProductVisible(productName);
    expect(isProductPresent).toBeTruthy();

    //checkout
    await mycartPage.navigateToCheckoutPage();
   
    //select country- checkout page
    await checkoutPage.selectCountry("India","ind")


    //enter checkout information - checkout page
    await checkoutPage.enterPaymentInformation("1234 5678 0000 2345","000","Priyanka Gautam","01","02");


    //assert shipping information - checkout page
    const emailIdGreyed = await checkoutPage.getGreyedEmailId();
    expect(email).toBe(emailIdGreyed);
    const actualUserNameEmailId = await checkoutPage.getUsernameEmailId();
    expect(actualUserNameEmailId).toContain(email);
    
    //Thankyou page - get order id
   checkoutPage.navigateToThankyouPage();

   //ThankyouPage assertion
   await expect(thankyouPage.thankyouText).toHaveText(" Thankyou for the order. ");
   const orderId = await thankyouPage.getOrderId();

   //Go to prders page and verify your order
   await thankyouPage.navigateToOrderHistoryPage();

  
   await orderHistoryPage.viewYourOrder(orderId);

 //verify order summary - order summary page
 const orderIdDetails = await orderSummaryPage.getOrderIdDetails();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();

 const addressSummaryDeatils = await orderSummaryPage.getAddressSummary();

 expect(addressSummaryDeatils.billingEmail.includes(email)).toBeTruthy();
 expect(addressSummaryDeatils.deliveryEmail.includes(email)).toBeTruthy();
   expect(addressSummaryDeatils.billingCountry.includes("India")).toBeTruthy();
expect(addressSummaryDeatils.deliveryCountry.includes("India")).toBeTruthy();

 const productNameFromSummary = await orderSummaryPage.getProductName();
expect(productNameFromSummary.trim()).toBe(productName);


});