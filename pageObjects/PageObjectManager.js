const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { MycartPage } = require("./MycartPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrderSummaryPage } = require("./OrderSummaryPage");
const { ThankyouPage } = require("./ThankyouPage");

class PageObjectManager{
    
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.myCartPage = new MycartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.thankyouPage = new ThankyouPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);

    }

    getLoginPageObj(){
        return this.loginPage;
    }

     getdashboardPageObj(){
        return this.dashboardPage;
    }

     getmyCartPageObj(){
        return this.myCartPage;
    }

     getcheckoutPageObj(){
        return this.checkoutPage;
    }

     getthankyouPageObj(){
        return this.thankyouPage;
    }

     getorderHistoryPageObj(){
        return this.orderHistoryPage;
    }

     getorderSummaryPageObj(){
        return this.orderSummaryPage;
    }


}
module.exports = {PageObjectManager};