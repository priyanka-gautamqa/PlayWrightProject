import {type Locator, type Page } from '@playwright/test';

export class MycartPage{

    page:Page;
    productList:Locator;
    checkoutButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.productList = page.locator('div li');
        this.checkoutButton = page.locator("text=Checkout");

    }

    async isProductVisible(productName:string){
        const productLocator = this.page.locator(`h3:has-text("${productName.trim()}")`);
    await productLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await productLocator.isVisible();

    }

    async navigateToCheckoutPage(){
        await this.checkoutButton.click();
    }
}
module.exports={MycartPage}