import {test as baseTest} from '@playwright/test'

type TestData = {
email:string;
password:string;
productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestData}>({
  testDataForOrder: async ({}, use) => {
    await use({
      email: "priyanka.gautam1905@gmail.com",
      password: "$$$$$$$$$$$$$",
      productName: "ZARA COAT 3"
    });
  }
});