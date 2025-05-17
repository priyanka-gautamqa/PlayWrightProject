class DashboardPage{

    constructor(page){
        this.page=page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.addTocartLink = page.locator("[routerlink*='cart']");
}

    async addProductToCart(productName){
        const productTitleList = await this.productsText.allTextContents()
            console.log("Product title list : ",productTitleList);
            const count = await this.products.count();
            
            for(let i=0; i<count;i++){
                if(await this.products.nth(i).locator("b").textContent()==productName){
                    //add to the cart
                    await this.products.nth(i).locator("text=Add To Cart").click();
                    //await this.waitForProductToBeAdded();
                   
                    break;
                }
            }
    }

    async navigateToCartPage(){
        const nav = this.page.waitForNavigation({ waitUntil: 'networkidle' });
        await this.addTocartLink.click();
        await nav;
    }

    // async waitForProductToBeAdded(){
    //     const cartRequest = this.page.waitForResponse(async (response) => {
    //         return (
    //             response.url().includes('/api/ecom/user/add-to-cart') &&
    //             response.request().method() === 'POST' &&
    //             response.status() === 200 &&
    //                 (await response.json()).message === 'Product Added To Cart'
    //          );
    //     });

    // }

}

module.exports={DashboardPage}