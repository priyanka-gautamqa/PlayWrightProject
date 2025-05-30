class MycartPage{

    constructor(page){
        this.page=page;
        this.productList = page.locator('div li');
        this.checkoutButton = page.locator("text=Checkout");

    }

    async isProductVisible(productName){
        const productLocator = this.page.locator(`h3:has-text("${productName.trim()}")`);
    await productLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await productLocator.isVisible();

    }

    async navigateToCheckoutPage(){
        await this.checkoutButton.click();
    }
}
module.exports={MycartPage}