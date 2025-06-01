const {test,expect} = require('@playwright/test')

test.skip('Browser Context-Validating Error Login',async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("priyanka.gautam1905@gmail.com");
    await page.locator("#userPassword").fill("*******");
    await page.locator("#login").click();
    
   /**
    * wait mechanism
    * 1. Little bit flaky : wait for the network to be idle. All the network calls called amd loaded : page.waitForLoadState('networkidle')
    * 2. Returns when element specified by locator satisfies the state option. If target element already satisfies the condition, 
    * the method returns immediately. Otherwise, waits for up to timeout milliseconds until the condition is met. : page.locator(".card-body b").waitFor()
    * However this method works when locator retruns single element and not the list of elements
    * 
*/

    //await page.waitForLoadState('networkidle'); : might be flaky
   // await page.locator(".card-body b").waitFor(); : Error: locator.waitFor: Error: strict mode violation: locator('.card-body b') resolved to 3 elements:
    
    await page.locator(".card-body b").first().waitFor(); //: works
    const productTitleList = await page.locator(".card-body b").allTextContents()
    console.log("Product title list : ",productTitleList)

});

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
test.skip('end to end flow for e commerce web site',async ({page})=>{

    const productName = 'ZARA COAT 3';
    const email='priyanka.gautam1905@gmail.com';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("priyanka.gautam1905@gmail.com");
    await page.locator("#userPassword").fill("*******");
    await page.locator("#login").click();
   //await page.locator(".card-body b").first().waitFor(); 
    await page.locator('.card-body b').first().waitFor({ state: 'visible' });
    const productTitleList = await page.locator(".card-body b").allTextContents()
    console.log("Product title list : ",productTitleList);
    const count = await products.count();
    
    for(let i=0; i<count;i++){
        if(await products.nth(i).locator("b").textContent()==productName){
            //add to the cart
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    //click on the cart and check if your product has been added
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const isProductPresent = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isProductPresent).toBeTruthy();

    //checkout
    await page.locator("text=Checkout").click();
   
    //assert shipping information
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
    const emailIdGreyed = await page.locator("div[class*='user__name'] label").textContent();
    expect(email).toBe(emailIdGreyed);
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    const inputList = page.locator("input[type='text']");
    await inputList.nth(0).fill("");
    await inputList.nth(0).fill("1234 5678 0000 2345");
    
    await inputList.nth(1).fill("");
    await inputList.nth(1).fill("000");

    await inputList.nth(2).fill("");
    await inputList.nth(2).fill("Priyanka Gautam");

    const expiryDateDropdown = page.locator(".input.ddl");
    await expiryDateDropdown.nth(0).selectOption("01");
    await expiryDateDropdown.nth(1).selectOption("02");
    
    //Thankyou page - get order id
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   //Go to prders page and verify your order
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
       await rows.nth(i).locator("button").first().click();
       break;
    }
 }

 //verify order summary
 const orderIdDetails = await page.locator(".col-text").textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();

 const addressSummary = page.locator(".address");
 const billingEmail = await addressSummary.nth(0).locator("p").nth(0).textContent();
 expect(billingEmail.includes(email)).toBeTruthy();

 const deliveryEmail = await addressSummary.nth(1).locator("p").nth(0).textContent();
 expect(deliveryEmail.includes(email)).toBeTruthy();

 const billingCountry = await addressSummary.nth(0).locator("p").nth(1).textContent();
 expect(billingCountry.includes("India")).toBeTruthy();

 const deliveryCountry = await addressSummary.nth(1).locator("p").nth(1).textContent();
 expect(deliveryCountry.includes("India")).toBeTruthy();

 const productNameFromSummary = await page.locator(".artwork-card-info .title").textContent();
expect(productNameFromSummary.trim()).toBe(productName);


});