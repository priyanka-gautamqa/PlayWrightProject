const {test,expect} = require('@playwright/test')

test('Browser Context-Validating Error Login',async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("priyanka.gautam1905@gmail.com");
    await page.locator("#userPassword").fill("Learning123$");
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


