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
    userPassword: "*********"
}
const createOrderPayload = 
{
    orders:
     [
        {
            country: "India",
            productOrderedId: "67a8dde5c0d3e6622a297cc8"
        }
    ]
}

let token;
let OrderId;

test.beforeAll(async ()=>{

    //login via API
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
    
    //create order API

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
       {
        data: createOrderPayload,
        headers: {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
       } 

    );

    const orderResponseJson = await orderResponse.json();
    console.log("orderResponseJson",orderResponseJson)
     OrderId = await orderResponseJson.orders[0];
    console.log("ORDER ID : ",OrderId);


});

test.beforeEach(()=>{

});

test.only('end to end flow for e commerce web site - OTHER WAY ',async ({page})=>{

    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    //INJECTING THE TOKEN IN THE WEB PAGE - use javascript to insert the token in Application Local Storage and playwright can execute any javascript expression
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client");

   //Go to prders page and verify your order
   await page.getByRole("listitem").getByRole('button',{name:"ORDERS"}).click();
   await page.locator("tbody").waitFor();

   await page.locator("tbody tr").filter({hasText:OrderId}).getByRole('button',{name:"View"}).click();

 //verify order summary
expect(await page.locator(".col-text").filter({hasText:OrderId})).toBeTruthy();

});