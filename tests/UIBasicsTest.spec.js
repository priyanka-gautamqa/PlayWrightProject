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
await pwd.fill("******")
await loginBtn.click()
//because of our timeout condition in config file,  folloing line it will wait for 3 seconds, explicitly wait is not required
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')

//ASSERTION 2 : enter correct credentials and login successfully
await userName.fill("")
await userName.fill("rahulshettyacademy")
await pwd.fill("")
await pwd.fill("*********")
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

test("@UI UI Controls",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
const pwd = page.locator("input[name='password']");
const loginBtn = page.locator("#signInBtn");
const dropdown = page.locator("select.form-control");
const radioBtnUser = page.locator("input[value='user'] + span");
const documentRequestLink = page.locator("a[href*='documents-request']");

//select dropwodn
await dropdown.selectOption("consult");

//select radio button and assert
await page.locator(".radiotextsty").nth(1).click();
await page.locator("#okayBtn").click();
//await page.pause();
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
 await expect(documentRequestLink).toHaveAttribute('class','blinkingText');

});

/**
 * click on the link and verify the text one new page
 * 
 * context.waitForEvent('page'); 
 * in above line here the context will wait and listen for any new event to be happen.
 * in this case - new page to be opened.
 *  when new page opens we can save or store it in new variable as new page. 
 * Imprtant is to have this line before the event happens
 * This statement returns a promise [status of the statement] - can be pending, rejected,fulfilled
 * 
 * await context.waitForEvent('page');  => no use fo await because now it will wait for the page to be opened but it will be opened in next line
 * Writing the line after clicking the link also does not make sense - because event has already happened and then we are asking the context to listen for the even to be happen
 * In conclusion we need both lines too be executed in parallel. That is  the context will start listeninga amd we will click on the link and at the same time context is still listening.
 * 
 * so when we want two steps to be executed in prallel we can use-
 * Promise.all()
 * An array of Promises.
    Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
    @returns — A new Promise. , we can also save it.  so in case two steps retru ing two promises then we can save ot

    all the steps present in the array will be executed but no one will wait for other one.
    step 1 will be executed, promise pending state let's suppose
    then step 2 will be exevuted, promise fulfilled
    but sinec step 1 is still penidng promise , it will keep in iterating
    Once all teh steps will return FULFILLED it will completed and come out if the iteration of Promise.all()

 * 
 */
test('@UI New page handling', async ({browser})=>{
   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentRequestLink = page.locator("a[href*='documents-request']");

    //if two pages opened from the follwoing  documentRequestLink.click(), then we can use: const [newPage1,newPage2] = await Promise.all(..remaining code...)
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listen for any new page pending, rejected,fulfilleed
            documentRequestLink.click(),
        ]);//new page opened

    const emailText =  await newPage.locator("p[class='im-para red'] a").textContent();
    console.log("EMAIL FROM NEW PAGE: ",emailText);

    //navigate to parent page and perform action - enter the above text in  the username field
    await page.locator("#username").fill(emailText);
    console.log("ENTERED EMAIL : ",page.locator("#username").textContent());



});

test('@UI Page playwright test',async ({page})=>
    {
await page.goto("https://www.google.com/")

/**
 * assert title of the page
 * get title and then assertion
*/
console.log(await page.title())
 await expect(page).toHaveTitle("Google")



});

