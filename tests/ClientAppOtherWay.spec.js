const {test,expect} = require('@playwright/test')

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
test.only('end to end flow for e commerce web site - OTHER WAY ',async ({page})=>{

    const productName = 'ZARA COAT 3';
    const email='priyanka.gautam1905@gmail.com';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
   
    await page.getByPlaceholder("email@example.com").fill("priyanka.gautam1905@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("**********");
    await page.getByRole('button',{name:"Login"}).click();

    await page.locator(".card-body b").first().waitFor(); 

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