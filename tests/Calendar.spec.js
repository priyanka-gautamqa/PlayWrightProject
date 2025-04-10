const {test,expect} = require('@playwright/test')

test('Calendar Validations',async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const monthNo = "4";
    const date = "10";
    const year = "2025";
    const expectedDate = [monthNo,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listen for any new page pending, rejected,fulfilleed
            await page.locator(".cart-header-navlink").filter({hasText:'Top Deals'}).click()
        ]);

    await newPage.locator(".react-date-picker__calendar-button").click(); //click on calendar to open it
    await newPage.locator("button[class='react-calendar__navigation__label']").click(); //click on first lable to open month 
    await newPage.locator("button[class='react-calendar__navigation__label']").click(); //click again to open year
    
    //select year
  //await newPage.getByText(year).click();
  await newPage.locator(".react-calendar__decade-view__years").getByRole('button',{name:year}).click();
 // await newPage.locator(".react-calendar__decade-view__years").filter({hasText:year}).click();

    //select month
    await newPage.locator(".react-calendar__year-view__months__month").nth(Number(monthNo)-1).click();

    //select date
    await newPage.locator(".react-calendar__month-view__days__day abbr").filter({hasText:date}).click();
  // await newPage.locator("//abbr[text()='"+date+"']").click(); 

  //one way to assert
  const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
 

    //other way to assert
    expect(await inputs.nth(1).getAttribute('value')).toBe(monthNo);
    expect( await inputs.nth(2).getAttribute('value')).toBe(date);
    expect(await inputs.nth(3).getAttribute('value')).toBe(year);



});