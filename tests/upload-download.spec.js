const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');
const path = require('path');
const baseDir = path.resolve(__dirname);


//readFile is a async step two ways to handle  - use await with async or use promise or use then()

/**
 * const workbook = new ExcelJs.Workbook(); //created the Object of class Workbook using ExcelJs

 * workbook.xlsx.readFile('ExcelDownloadTest.xlsx').then(function(){

    const worksheet = workbook.getWorksheet('Sheet1');

//print all values of the excel
worksheet.eachRow((row,rowNumber)=>{
    row.eachCell((cell,colNumber)=>{
        console.log(cell.value);
    })
})
})
*/

//OTHER WAY
let updatedPrice;
async function writeExcelTest(searchText,newValue,changePriceByAmount,fileName){

    const workbook = new ExcelJs.Workbook(); 
    await workbook.xlsx.readFile(fileName);
    const worksheet = workbook.getWorksheet('Sheet1');
  

    const output = await readExcel(worksheet,searchText);

    //replace some cell value
    const cell = worksheet.getCell(output.row,output.column);
    cell.value = newValue;

    const priceCell = worksheet.getCell(output.row,output.column+2);
    console.log("Price before update : ",priceCell.value);
    priceCell.value=priceCell.value+changePriceByAmount;
    console.log("Price after update : ",priceCell.value);
    updatedPrice= priceCell.value;
    //save the above change 
    await workbook.xlsx.writeFile(fileName);

}


async function readExcel(worksheet,searchText){
    //print all values of the excel
    let output = {row:1,column:1};
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
           // console.log(cell.value); //-  to print all values
            if(cell.value===searchText){
                output.row=rowNumber;
                output.column=colNumber;
                console.log("rowNumber",rowNumber);
            }
        })
    })
    return output;
}



/**
 * END TO END
 *  Download the excel
 *  Change the content as per the requirement
 *  Upload the changed file
 *  Check the changed content on website
 * 
 */

test('Upload download excel functionality',async ({page})=>{
const searchText = "Apple";
const updatedText = "PEACHES";
const updatePriceBy =100;

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    //download the file
    const downloadPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    const downloadComp = await downloadPromise; //wait for the file to get downloaded successfully
    
    //save the file
    const fileName = downloadComp.suggestedFilename();
    const filePath = path.join(baseDir, fileName);
    await downloadComp.saveAs(filePath);
    console.log("filePath : ",filePath);

/**
 * First parameter- Text which needs to be replaced
 * Second parameter - Text which will replace the given text
 * Third parameter - update price by 50rupees more
 * Fourth parameter - file name or file path
 */
writeExcelTest(searchText,updatedText,updatePriceBy,filePath)

//upload the file
await page.locator("#fileinput").click();
//handle the windows window
//setInputFiles work only when input type is file for that locator
await page.locator("#fileinput").setInputFiles(filePath);
const textlocator = page.getByText(updatedText);
const desiredRow = await page.getByRole('row').filter({has :textlocator });
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(String(updatedPrice));
await expect(desiredRow.locator("#cell-2-undefined")).toContainText(updatedText);


})