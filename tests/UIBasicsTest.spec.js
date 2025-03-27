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
test.only('Browser context playwright test',async ({browser})=>
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
await pwd.fill("*******")
await loginBtn.click()
//because of our timeout condition in config file,  folloing line it will wait for 3 seconds, explicitly wait is not required
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')

//ASSERTION 2 : enter correct credentials and login successfully
await userName.fill("")
await userName.fill("rahulshettyacademy")
await pwd.fill("")
await pwd.fill("********")
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