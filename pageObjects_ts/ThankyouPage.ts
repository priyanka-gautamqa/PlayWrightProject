import { type Locator, type Page } from "@playwright/test";

export class ThankyouPage{

    page:Page;
    thankyouText:Locator;
    orderid:Locator;
    ordersLink: Locator;

    constructor(page:Page){
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