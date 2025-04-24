const{test,expect}= require('@playwright/test')

test("POPUP VALIDATIONS",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    /**Navigate backward 
     * and forward in 
     * the browser
     * */
    // await page.goto("http://google.com");
    //  await page.goBack();
    // await page.goForward();

    /**
     * Hide and Show validation
     * Click on Hide and assert
     * Click on show and assert
     */

    //one way
    await page.locator("#hide-textbox").click(); //hide it
    let styleValue = await page.locator("#displayed-text").getAttribute("style");
    expect(styleValue.includes("none")).toBeTruthy(); //assert if it is hidden

    await page.locator("#show-textbox").click(); // show it
    styleValue = await page.locator("#displayed-text").getAttribute("style");
    expect(styleValue.includes("block")).toBeTruthy(); //assert if it is not hidden

    //other way
    await expect(page.locator("#displayed-text")).toBeVisible(); //not hidden
    await page.locator("#hide-textbox").click(); //hide it
    await expect(page.locator("#displayed-text")).toBeHidden(); //should not be hidden
    
/**
 * Java popup or dialog in playwright
 * even - dialog
 * Cancel - dismiss()
 * ok - accept()
 * 
 * first argument is event which is dailog in this case
 * second argument is the action we want to perform on the popup
 * 
 * this will accept/dismiss all the popups which will be opened after event listener line for this page.
 * Hence to handle two popups we can use logic
 */

    //how to accept/dismiss the popup
    page.on('dialog',dialog=>{
        console.log("Dialog says:", dialog.message()); 
        dialog.accept()
    }); 
    
   // page.on('dialog',dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();


   /**
    * how to accept or dismiss two popups for the same page

    let count = 0;
page.on('dialog', dialog => {
  count++;
  if (count === 1) {
    dialog.accept(); // First dialog
  } else {
    dialog.dismiss(); // Second dialog
  }
});
*/

//MOUSE HOVER
    await page.locator("#mousehover").hover();

    //FRAMES HANDLING
    const frameLoc = page.frameLocator("#courses-iframe");
    await frameLoc.locator("li a[href='lifetime-access']:visible").click(); //here the locator resolved into two elements in which one is hidden hence we can use visible mode to click on one of the visible element
    const message = await frameLoc.locator(".text span").textContent();
    //get the no of subscribers and assert it
    console.log("MESSAGE : ",message);

});

test("SCREENSHOT VALIDATIONS",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#hide-textbox").click(); //hide it
  //take the screenshot
  await page.screenshot({path:'screenshot.png'}); //will take complete page screenshot
  await expect(page.locator("#displayed-text")).toBeHidden();

  await page.locator("#show-textbox").click(); // show it
    //take screenshot but only for the text box which is vsible after clicking on show button
   await page.locator('#displayed-text').screenshot({path:'LocatorScreenshot.png'});
   await expect(page.locator("#displayed-text")).toBeVisible();

});

/**
 * VISUAL TESTING
 *  compare two images
 * for example compare login page image from day 1 execution to next execution login page image
 * first time it will fail as it will store the image and then next time it will have some image to cmpare
 */

test.only("VISUALS TESTINGs",async({page})=>{
  await page.goto("https://google.com/");
  expect(await page.screenshot()).toMatchSnapshot('LandingPageFlight.png');
 
});