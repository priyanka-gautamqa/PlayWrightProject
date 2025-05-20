const {test,expect,request} = require('@playwright/test')
const {ApiUtils} = require('../utils/ApiUtils')

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
    userPassword: "$$$$$$$$$"
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

let response;
test.beforeAll(async ()=>{

  //initialistaion
    const apiContext = await request.newContext(); //to give some predefined information like proxies for the api
    const apiUtils= new ApiUtils(apiContext,loginPayLoad); //object created
    response = await apiUtils.createOrder(createOrderPayload);



});

test.beforeEach(()=>{

});

test.only('end to end flow for e commerce web site - API PLACING ORDER ',async ({page})=>{
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    //INJECTING THE TOKEN IN THE WEB PAGE - use javascript to insert the token in Application Local Storage and playwright can execute any javascript expression
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");

   //Go to prders page and verify your order
   await page.getByRole("listitem").getByRole('button',{name:"ORDERS"}).click();
   await page.locator("tbody").waitFor();

   await page.locator("tbody tr").filter({hasText:response.OrderId}).getByRole('button',{name:"View"}).click();

 //verify order summary
expect(await page.locator(".col-text").filter({hasText:response.OrderId})).toBeTruthy();

});