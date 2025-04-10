const {test,expect,request} = require('@playwright/test')

/**
 * DO Login using login API
 *      - instead if entering username password 
 *      - call login api with username and pasword
 *      - token will be generated
 *  use this token to inject in the web browser 
 *  Open the required page and perform required actions or assertions
 * 
 * usage of such login
 *  - save time for login when there are many test cases
 *  -  api testing is less flaky
 * 
 */
const loginPayLoad = {
    userEmail: "priyanka.gautam1905@gmail.com",
    userPassword: "*********$"
}

let token;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext(); //to give some predefined information like proxies for the api
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayLoad
        }
    )

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); //parse the token
    token = await loginResponseJson.token;

    console.log("loginResponseJson",loginResponseJson);
    console.log("token",token);
    

});

test.beforeEach(()=>{

});

test.only('end to end flow for e commerce web site - OTHER WAY ',async ({page})=>{

    const productName = 'ZARA COAT 3';
    const email='priyanka.gautam1905@gmail.com';
    const products = page.locator(".card-body");

    //await page.getByPlaceholder("email@example.com").fill("priyanka.gautam1905@gmail.com");
    //await page.getByPlaceholder("enter your passsword").fill("*********$");
    //await page.getByRole('button',{name:"Login"}).click();

    //use javascript to insert the token in Application Local Storage and playwright can execute any javascript expression
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client");

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