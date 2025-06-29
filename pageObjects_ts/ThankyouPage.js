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
exports.ThankyouPage = void 0;
class ThankyouPage {
    constructor(page) {
        this.page = page;
        this.thankyouText = page.locator(".hero-primary");
        this.orderid = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersLink = page.locator("button[routerlink*='myorders']");
    }
    getOrderId() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderid.textContent();
        });
    }
    navigateToOrderHistoryPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ordersLink.click();
            yield this.page.waitForLoadState('networkidle');
        });
    }
}
exports.ThankyouPage = ThankyouPage;
module.exports = { ThankyouPage };
