class ThankyouPage{
    constructor(page){
        this.page=page;
        this.thankyouText = page.locator(".hero-primary");
        this.orderid = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersLink = page.locator("button[routerlink*='myorders']");
    }

    async getOrderId(){
        return this.orderid.textContent();
    }

    async navigateToOrderHistoryPage(){
        await this.ordersLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports={ThankyouPage};