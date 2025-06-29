"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageObjectManager = void 0;
const CheckoutPage_1 = require("./CheckoutPage");
const DashboardPage_1 = require("./DashboardPage");
const LoginPage_1 = require("./LoginPage");
const MycartPage_1 = require("./MycartPage");
const OrderHistoryPage_1 = require("./OrderHistoryPage");
const OrderSummaryPage_1 = require("./OrderSummaryPage");
const ThankyouPage_1 = require("./ThankyouPage");
class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage_1.LoginPage(page);
        this.dashboardPage = new DashboardPage_1.DashboardPage(page);
        this.myCartPage = new MycartPage_1.MycartPage(page);
        this.checkoutPage = new CheckoutPage_1.CheckoutPage(page);
        this.thankyouPage = new ThankyouPage_1.ThankyouPage(page);
        this.orderHistoryPage = new OrderHistoryPage_1.OrderHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage_1.OrderSummaryPage(page);
    }
    getLoginPageObj() {
        return this.loginPage;
    }
    getdashboardPageObj() {
        return this.dashboardPage;
    }
    getmyCartPageObj() {
        return this.myCartPage;
    }
    getcheckoutPageObj() {
        return this.checkoutPage;
    }
    getthankyouPageObj() {
        return this.thankyouPage;
    }
    getorderHistoryPageObj() {
        return this.orderHistoryPage;
    }
    getorderSummaryPageObj() {
        return this.orderSummaryPage;
    }
}
exports.PageObjectManager = PageObjectManager;
module.exports = { PageObjectManager };
