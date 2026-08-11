import {Page,Locator} from '@playwright/test';

export default class TestCasePage {

    page: Page;
    listOfTestcases: Locator;

    constructor(page:Page) {
        this.page = page;
        this.listOfTestcases = page.locator('[data-toggle="collapse"] u');
    }
 

    async getTestCasesCount() {
        const testCasesCount = await this.listOfTestcases.count();
       return testCasesCount;
    }

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     