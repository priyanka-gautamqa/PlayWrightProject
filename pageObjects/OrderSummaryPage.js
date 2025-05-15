class OrderSummaryPage{
    constructor(page){
        this.page=page;
        this.orderIdDetails = page.locator(".col-text");
        this.addressSummary = page.locator(".address");
        this.productName = page.locator(".artwork-card-info .title");

    }

    async getOrderIdDetails(){
        return await this.orderIdDetails.first().textContent();
    }

    async getAddressSummary(){
       let billingEmail = await this.addressSummary.nth(0).locator("p").nth(0).textContent();
        let deliveryEmail = await this.addressSummary.nth(1).locator("p").nth(0).textContent();
        let billingCountry = await this.addressSummary.nth(0).locator("p").nth(1).textContent();
        let deliveryCountry = await this.addressSummary.nth(1).locator("p").nth(1).textContent();
        let addressSummaryDeatils = {billingEmail,deliveryEmail,billingCountry,deliveryCountry};
        return addressSummaryDeatils;

    }

    async getProductName(){
        return await this.productName.textContent();
    }
}
module.exports={OrderSummaryPage};