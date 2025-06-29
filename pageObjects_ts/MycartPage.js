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
exports.MycartPage = void 0;
class MycartPage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator('div li');
        this.checkoutButton = page.locator("text=Checkout");
    }
    isProductVisible(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            const productLocator = this.page.locator(`h3:has-text("${productName.trim()}")`);
            yield productLocator.waitFor({ state: 'visible', timeout: 5000 });
            return yield productLocator.isVisible();
        });
    }
    navigateToCheckoutPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkoutButton.click();
        });
    }
}
exports.MycartPage = MycartPage;
module.exports = { MycartPage };
