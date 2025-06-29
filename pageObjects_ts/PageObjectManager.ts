import { CheckoutPage } from './CheckoutPage'
import { DashboardPage } from './DashboardPage'
import { LoginPage } from './LoginPage'
import { MycartPage } from './MycartPage'
import { OrderHistoryPage } from './OrderHistoryPage'
import { OrderSummaryPage } from './OrderSummaryPage'
import { ThankyouPage } from './ThankyouPage'
import {Page} from '@playwright/test'

export class PageObjectManager{
    
    page : Page;
    loginPage: LoginPage;
    dashboardPage:DashboardPage;
    myCartPage:MycartPage;
    checkoutPage:CheckoutPage;
    thankyouPage:ThankyouPage;
    orderHistoryPage:OrderHistoryPage;
    orderSummaryPage:OrderSummaryPage;


    constructor(page:Page){
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