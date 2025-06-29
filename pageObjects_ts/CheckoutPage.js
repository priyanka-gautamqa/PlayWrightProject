"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPage = void 0;
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.countryField = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.inputCardDetailsList = page.locator("input[type='text']");
        this.expiryDateDropdown = page.locator(".input.ddl");
        this.emailIdGreyed = page.locator("div[class*='user__name'] label");
        this.userNameEmailId = page.locator(".user__name [type='text']");
        this.submitButton = page.locator(".action__submit");
    }
    selectCountry(countryName, countryAcronym) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.countryField.pressSequentially(countryAcronym);
            yield this.countryDropdown.waitFor();
            const optionsCount = yield this.countryDropdown.locator("button").count();
            for (let i = 0; i < optionsCount; ++i) {
                const text = yield this.countryDropdown.locator("button").nth(i).textContent();
                if ((text === null || text === void 0 ? void 0 : text.trim()) === countryName) {
                    yield this.countryDropdown.locator("button").nth(i).click();
                    break;
                }
            }
        });
    }
    enterPaymentInformation(cardNumber, cvv, name, expiryDate, expiryMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.inputCardDetailsList.nth(0).fill("");
            yield this.inputCardDetailsList.nth(0).fill(cardNumber);
            yield this.inputCardDetailsList.nth(1).fill("");
            yield this.inputCardDetailsList.nth(1).fill(cvv);
            yield this.inputCardDetailsList.nth(2).fill("");
            yield this.inputCardDetailsList.nth(2).fill(name);
            yield this.expiryDateDropdown.nth(0).selectOption(expiryDate);
            yield this.expiryDateDropdown.nth(1).selectOption(expiryMonth);
        });
    }
    getGreyedEmailId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.emailIdGreyed.textContent();
        });
    }
    getUsernameEmailId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userNameEmailId.first().textContent();
        });
    }
    navigateToThankyouPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.submitButton.click();
        });
    }
}
exports.CheckoutPage = CheckoutPage;
module.exports = { CheckoutPage };
