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
exports.OrderHistoryPage = void 0;
class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersList = page.locator("tbody tr");
        this.orderHistoryTable = page.locator("tbody");
    }
    viewYourOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderHistoryTable.waitFor();
            const totalOrders = yield this.ordersList.count();
            for (let i = 0; i < totalOrders; ++i) {
                const rowOrderId = yield this.ordersList.nth(i).locator("th").textContent();
                if (orderId.includes(rowOrderId)) {
                    yield this.ordersList.nth(i).locator("button").first().click();
                    yield this.page.waitForLoadState('networkidle');
                    break;
                }
            }
        });
    }
}
exports.OrderHistoryPage = OrderHistoryPage;
module.exports = { OrderHistoryPage };
