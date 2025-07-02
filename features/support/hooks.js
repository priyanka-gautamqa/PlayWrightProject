const {PageObjectManager} = require('../../pageObjects/PageObjectManager')
const {Before,After, BeforeStep,AfterStep,Status} = require('@cucumber/cucumber');
const path = require('path');
const { chromium } = require('playwright');


Before(async function(){
 const browser = await chromium.launch({ headless: false });
            const context = await browser.newContext();
            this.page = await context.newPage();
            this.pageObjectManager = new PageObjectManager(this.page);
});

After( function(){
    console.log("Cleanup at last is done")
});

BeforeStep({tags: "@foo"}, function () {
  // This hook will be executed before all steps in a scenario
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path:'cucumberScreenshot.png'});
  }
});