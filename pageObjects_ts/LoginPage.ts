import {type Locator, type Page } from '@playwright/test';

export class LoginPage{

    page:Page;
    logInButton:Locator;
    username:Locator;
    password:Locator;

    constructor(page:Page){
        this.page=page;
        this.logInButton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        
    }

    async goToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.logInButton.click();
       
         await this.page.locator('div:has-text("Login Successfully")')
  .waitFor({ state: 'visible', timeout: 5000 })
  .catch(() => {});
        await this.page.waitForLoadState('networkidle');
        // const nav = page.waitForNavigation({ waitUntil: 'load' });
        // await this.logInButton.click();
        // await nav;

    }
}
module.exports={LoginPage};