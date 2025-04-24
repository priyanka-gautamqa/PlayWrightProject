const {test,expect,request} = require('@playwright/test')
const {ApiUtils} = require('./utils/ApiUtils')

/**
 *TEST CASE 
    - Check the message on orders page when there is no order 

 * I When we reuse test data then it will be diffiult to maintain test data wothut any order 
    hence to avoid failure of test case because of test data,
     we can intercept the netwrok call to change the response of the api which is responsible for rendering teh message or orders on the page
     before verification

   * Before clickning on Orders button we have to mock the orders call
     intercepting the response - API response -> {playwright - mocked response}->browser -> render data on front end  

     * right now the id is hardcoded in the intercepting API, we can also generailse it . one way is to use * because we want to verofy the message
        https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*

 */
const loginPayLoad = {
    userEmail: "priyanka.gautam1905@gmail.com",
    userPassword: "$$$$$$$$$$"
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

let mockedPayloadOrders = {data:[],message:"No Orders"}; //javascript object

test.beforeAll(async ()=>{

  //initialistaion
    const apiContext = await request.newContext(); //to give some predefined information like proxies for the api
    const apiUtils= new ApiUtils(apiContext,loginPayLoad); //object created
    response = await apiUtils.createOrder(createOrderPayload);

});

test.beforeEach(()=>{

});

test.only('Intercepting netwrok call - mocking data to verify the message on orders page when no order is available ',async ({page})=>{
  
     page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67e31eafc019fb1ad638e457",
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(mockedPayloadOrders); //JSON object is needed for the API
            await route.fulfill({
                response,
                body,
            })
        }
    )

   //Go to prders page and verify your message
   await page.getByRole("listitem").getByRole('button',{name:"ORDERS"}).click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67e31eafc019fb1ad638e457");
    expect(await page.locator(".mt-4").textContent()).toContain(" You have No Orders to show at this time.");
   const buttons = page.locator(".row button");
    expect(await buttons.first().textContent()).toBe("Go Back to Shop");
    expect(await buttons.last().textContent()).toBe("Go Back to Cart");
    
});