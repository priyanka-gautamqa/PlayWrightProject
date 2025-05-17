class LoginPage{
    constructor(page){
        this.page=page;
        this.logInButton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        
    }

    async goToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.logInButton.click();
        await this.page.waitForLoadState('networkidle');
        // const nav = page.waitForNavigation({ waitUntil: 'load' });
        // await this.logInButton.click();
        // await nav;

    }
}
module.exports={LoginPage};