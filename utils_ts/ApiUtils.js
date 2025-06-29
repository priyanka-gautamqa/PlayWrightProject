class ApiUtils
{
    constructor(apiContext,loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){

         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data:this.loginPayLoad
                }
            )
            const loginResponseJson = await loginResponse.json(); //parse the token
            const token = await loginResponseJson.token;
            console.log("token",token);
            return token;
    }

    async createOrder(createOrderPayload){
        let response={};
        response.token= await this.getToken();
     
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
             data: createOrderPayload,
             headers: {
                 'Authorization' : response.token,
                 'Content-Type' : 'application/json'
             }
            } 
     
         );
     
         const orderResponseJson = await orderResponse.json();
          const OrderId = await orderResponseJson.orders[0];
         console.log("ORDER ID : ",OrderId);
         response.OrderId = OrderId;
         return response;

    }

}
module.exports = {ApiUtils};