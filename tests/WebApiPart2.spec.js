/**
 * Login once - store all the information in .json file
 * Test - Add to cart functionality, order create,order details,order history
 * Each test case will open browser again
 * Now inject all the settings from .json file into these browsers opening.
 * Then browser will open with that storage state
 * We will create teh cintext using this .json file where all the info has been stored
 * 
 */
const {test,expect} = require('@playwright/test')
let webContext;

test.beforeAll(async({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("priyanka.gautam1905@gmail.com");
    await page.locator("#userPassword").fill("$$$$$$$$$$");
    await page.getByRole('button',{name:"Login"}).click();
    await page.locator(".card-body b").first().waitFor(); 
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});

});

test('@API Test1 e commerce web site - with storage settings ',async ({})=>{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const productName = 'ZARA COAT 3';
    const email='priyanka.gautam1905@gmail.com';
    const products = page.locator(".card-body");
    await page.locator(".card-body").filter({hasText:productName}).getByRole('button',{name:"Add to Cart"}).click();

//li means listitem - we can also use this
 //click on the cart and check if your product has been added
   
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

    await page.locator('div li').first().waitFor();

   expect(page.getByText(productName)).toBeVisible();
    //checkout
    await page.getByRole('button',{name:"Checkout"}).click();
   
    //assert shipping information
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole('button',{name:"India"}).nth(1).click();
    
    const emailIdGreyed = await page.locator("div[class*='user__name'] label").textContent();
    expect(email).toBe(emailIdGreyed);
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    //Thankyou page - get order id
   await page.getByText("PLACE ORDER").click();

   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   const cleanOrderId = orderId.replace(/[|]/g, '').trim();

   //Go to prders page and verify your order
   await page.getByRole("listitem").getByRole('button',{name:"ORDERS"}).click();
   await page.locator("tbody").waitFor();

   await page.locator("tbody tr").filter({hasText:cleanOrderId}).getByRole('button',{name:"View"}).click();

 //verify order summary
 const orderIdDetails = await page.locator(".col-text").textContent();
expect(await page.locator(".col-text").filter({hasText:cleanOrderId})).toBeTruthy();


});

test('Test 2 e commerce web site - with storage settings ',async ({})=>{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const productName = 'ZARA COAT 3';
    const email='priyanka.gautam1905@gmail.com';
    const products = page.locator(".card-body");
    await page.locator(".card-body").filter({hasText:productName}).getByRole('button',{name:"Add to Cart"}).click();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});