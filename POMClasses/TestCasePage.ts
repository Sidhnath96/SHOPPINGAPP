import {Page,Locator} from '@playwright/test';

export default class TestCasePage {

    page: Page;
    testCaseButton: Locator;
    listOfTestcases: Locator;

    constructor(page:Page) {
        this.page = page;
        this.testCaseButton = page.locator('a[href="/test_cases"]').first();
        this.listOfTestcases = page.locator('[data-toggle="collapse"] u');
    }

    async clickOnTestCaseButton() {
        await this.testCaseButton.click();
    }   

    async getTestCacesCount() {
        const testCasesCount = await this.listOfTestcases.count();
       return testCasesCount;
    }

}