class CheckoutPage{

    constructor(page){
        this.page=page;
        this.countryField = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.inputCardDetailsList = page.locator("input[type='text']");  
        this.expiryDateDropdown = page.locator(".input.ddl");
        this.emailIdGreyed =  page.locator("div[class*='user__name'] label");
        this.userNameEmailId = page.locator(".user__name [type='text']");
        this.submitButton = page.locator(".action__submit");
       

    }

    async selectCountry(countryName,countryAcronym){
         await this.countryField.pressSequentially(countryAcronym);
         await this.countryDropdown.waitFor();
        const optionsCount = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
             }
        }

    }

    async enterPaymentInformation(cardNumber,cvv,name,expiryDate,expiryMonth){
    
        await this.inputCardDetailsList.nth(0).fill("");
        await this.inputCardDetailsList.nth(0).fill(cardNumber);
    
        await this.inputCardDetailsList.nth(1).fill("");
        await this.inputCardDetailsList.nth(1).fill(cvv);

        await this.inputCardDetailsList.nth(2).fill("");
        await this.inputCardDetailsList.nth(2).fill(name);

        await  this.expiryDateDropdown .nth(0).selectOption(expiryDate);
        await  this.expiryDateDropdown .nth(1).selectOption(expiryMonth);
    }

    async getGreyedEmailId(){
        return  await this.emailIdGreyed.textContent();
    }

    async getUsernameEmailId(){
        return await this.userNameEmailId.first().textContent();
    }

    async navigateToThankyouPage(){
        await this.submitButton.click();
    }


}
module.exports={CheckoutPage}