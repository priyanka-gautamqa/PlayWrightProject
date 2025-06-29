import {type Locator, type Page } from '@playwright/test';
export class DashboardPage{

    page:Page;
    products:Locator;
    productsText:Locator;
    addTocartLink:Locator;

    constructor(page:Page){
        this.page=page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.addTocartLink = page.locator("[routerlink*='cart']");
}

    async addProductToCart(productName:string){
        const productTitleList = await this.productsText.allTextContents()
            console.log("Product title list : ",productTitleList);
            const count = await this.products.count();
            
            for(let i=0; i<count;i++){
                if(await this.products.nth(i).locator("b").textContent()==productName){
                    //add to the cart
                    await this.products.nth(i).locator("text=Add To Cart").click();
                    await this.waitForProductToBeAdded();
                   
                    break;
                }
            }
             await this.page.locator('div[class*="toast-success"]:has-text("Product Added To Cart")')
  .waitFor({ state: 'visible', timeout: 5000 })
  .catch(() => {});
    }

    async navigateToCartPage(productName:string){
        // const nav = this.page.waitForNavigation({ waitUntil: 'networkidle' });
        // await this.addTocartLink.click();
        // await nav;
        console.log("PRODUCT NAME  EXISTIS: ",productName)
        await Promise.all([
        this.page.locator(`h3:has-text("${productName}")`).waitFor({ state: 'visible', timeout: 5000 }),
        this.addTocartLink.click()
    ]);
    }

    async waitForProductToBeAdded(){
        return this.page.waitForResponse(async (response) => {
            return (
                response.url().includes('/api/ecom/user/add-to-cart') &&
                response.request().method() === 'POST' &&
                response.status() === 200 &&
                    (await response.json()).message === 'Product Added To Cart'
             );
        });

        

    }

}

module.exports={DashboardPage}