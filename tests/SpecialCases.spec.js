const {test,expect} = require('@playwright/test');
const { hasUncaughtExceptionCaptureCallback } = require('process');

test("Playwright Special Locators ",async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //selections can be done using getByLabel
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female")

    /**NOTE: getByLabel can also be used to enter into the text boxes ,but for the cases where on click the lable , input box should get highlighted.
        *in these cases if we check the DOM 
        - input tag is inside label tag 
        - any association is there between input and lable tags
    */
    //input can be given using this as well
    await page.getByPlaceholder("Password").fill("");
    await page.getByPlaceholder("Password").fill("asdf123");

    //getByRole("button".... will fetch all buttons and hence we can give next argument specifically to tell which button we want to act upon 
    await page.getByRole("button",{name: "Submit"}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //retruns boolean value

    await page.getByRole("link",{name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

});