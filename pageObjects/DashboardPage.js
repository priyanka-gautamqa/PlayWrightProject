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
                    break;
                }
            }
    }

    async navigateToCartPage(){
        await this.addTocartLink.click();
    }

}

module.exports={DashboardPage}