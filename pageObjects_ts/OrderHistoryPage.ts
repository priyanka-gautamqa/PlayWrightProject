import { type Locator, type Page } from "@playwright/test";

export class OrderHistoryPage{

    page:Page;
    ordersList:Locator;
    orderHistoryTable:Locator;

    constructor(page:Page   ){
        this.page=page;
        this.ordersList = page.locator("tbody tr");
        this.orderHistoryTable = page.locator("tbody");
    }

    async viewYourOrder(orderId:any){
        await this.orderHistoryTable.waitFor();
        const totalOrders = await this.ordersList.count();
        for (let i = 0; i < totalOrders; ++i) {
        const rowOrderId = await this.ordersList.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.ordersList.nth(i).locator("button").first().click();
                await this.page.waitForLoadState('networkidle');
                break;
            }
        }
    }

}
module.exports = {OrderHistoryPage};