const {test,expect} = require('@playwright/test');

/*
if i use const {playwrightTest} = require('@playwright/test'); //destructuring - better and cleaner
then i can directly use methods : test()

if i use const playwrightTest = require('@playwright/test'); // importing everything
then i cant call test directly - i need to access methods like -
playwrightTest.test();
playwrightTest.expect();

*/
//why we have given browser inside curly braces -> because it's not just a variable . here browser is from @playwright/test 
test('Browser context playwright test',async ({browser})=>
    {
//open a new browser instance with new context , which will not have  cookies and other things
const newBrowser = (await browser.newContext())
const page = await newBrowser.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title())

//GET LOCATORS
const userName = page.locator('#username')
const pwd = page.locator("input[name='password']")
const loginBtn = page.locator("#signInBtn")
const productTitleList = page.locator(".card-body a")

//ASSERTION 1 : error message while enetring incorrect credentials
await userName.fill("priyanka")
await pwd.fill("testing")
await loginBtn.click()
//because of our timeout condition in config file,  folloing line it will wait for 3 seconds, explicitly wait is not required
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')

//ASSERTION 2 : enter correct credentials and login successfully
await userName.fill("")
await userName.fill("rahulshettyacademy")
await pwd.fill("")
await pwd.fill("learning")
await loginBtn.click()

//ASSERTION 3 : get the title of the first product
//console.log(await page.locator(".card-body a").textContent()) // 4 matches hence it will fail
/**
 * Multiple ways to get first element from the list of locators
 * use nth element locator.nth()
 * locator.first()
 * 
 */
console.log(await productTitleList.first().textContent())

/**
 * For following lines - playwright has wait mecahnism and wait for the element to be get attache to the dom 
 * console.log(await productTitleList.first().textContent())
console.log(await productTitleList.nth(1).textContent())
console.log(await productTitleList.last().textContent())
 * 
 */


//allTextContents method does not wait for the element to be loaded and might return empty list [no error]
const productTitlesText = await productTitleList.allTextContents()
console.log(productTitlesText)

newBrowser.close()

});

test.only("UI Controls",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
const pwd = page.locator("input[name='password']");
const loginBtn = page.locator("#signInBtn");
const dropdown = page.locator("select.form-control");
const radioBtnUser = page.locator("input[value='user'] + span");
const documentRequest = page.locator("a[href*='documents-request']");

//select dropwodn
await dropdown.selectOption("consult");

//select radio button and assert
await page.locator(".radiotextsty").nth(1).click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
console.log("Readio button selected : ",await page.locator(".radiotextsty").nth(1).isChecked());
 
//checkmarm the checkbox and assert if it is checked
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();

//uncheck the checkbox amd assert if it unchecked
await page.locator("#terms").uncheck();
 expect(await page.locator("#terms").isChecked()).toBeFalsy();

 //assert the link is blinking - class attribute must have blinkingText
 /**
  * const locator = page.locator('input');
await expect(locator).toHaveAttribute('type', 'text');
  */
 await expect(documentRequest).toHaveAttribute('class','blinkingText');

 /**
  * Click on the blinking link and verify the text on the new opened page
  * Here a new page is opening it means w ehav eto cretae new page to work upon this newly opened page after clicnking on the link.
  */

});

test('Page playwright test',async ({page})=>
    {
await page.goto("https://www.google.com/")

/**
 * assert title of the page
 * get title and then assertion
*/
console.log(await page.title())
 await expect(page).toHaveTitle("Google")

});
