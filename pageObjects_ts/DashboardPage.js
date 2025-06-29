"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.addTocartLink = page.locator("[routerlink*='cart']");
    }
    addProductToCart(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            const productTitleList = yield this.productsText.allTextContents();
            console.log("Product title list : ", productTitleList);
            const count = yield this.products.count();
            for (let i = 0; i < count; i++) {
                if ((yield this.products.nth(i).locator("b").textContent()) == productName) {
                    //add to the cart
                    yield this.products.nth(i).locator("text=Add To Cart").click();
                    yield this.waitForProductToBeAdded();
                    break;
                }
            }
            yield this.page.locator('div[class*="toast-success"]:has-text("Product Added To Cart")')
                .waitFor({ state: 'visible', timeout: 5000 })
                .catch(() => { });
        });
    }
    navigateToCartPage(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            // const nav = this.page.waitForNavigation({ waitUntil: 'networkidle' });
            // await this.addTocartLink.click();
            // await nav;
            console.log("PRODUCT NAME  EXISTIS: ", productName);
            yield Promise.all([
                this.page.locator(`h3:has-text("${productName}")`).waitFor({ state: 'visible', timeout: 5000 }),
                this.addTocartLink.click()
            ]);
        });
    }
    waitForProductToBeAdded() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.waitForResponse((response) => __awaiter(this, void 0, void 0, function* () {
                return (response.url().includes('/api/ecom/user/add-to-cart') &&
                    response.request().method() === 'POST' &&
                    response.status() === 200 &&
                    (yield response.json()).message === 'Product Added To Cart');
            }));
        });
    }
}
exports.DashboardPage = DashboardPage;
module.exports = { DashboardPage };
