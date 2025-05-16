const {test:baseTest} = require('@playwright/test');

exports.customTest = baseTest.extend({
  testDataForOrder: async ({}, use) => {
    await use({
      email: "priyanka.gautam1905@gmail.com",
      password: "$$$$$$$$$$",
      productName: "ZARA COAT 3"
    });
  }
});