import { Page, Locator } from '@playwright/test';

export default class HomePage{

    page: Page;
    productsBtn :Locator;
    cartbutton: Locator;
    contactUsLink: Locator;
    testCasesLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsBtn = page.getByRole('link', { name: ' Products'});
        this.cartbutton = page.getByRole('link', { name: ' Cart' });
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.testCasesLink = page.locator('a[href="/test_cases"]');
    }

    //use promises to wait for the page to load before clicking the button
    async clickViewProducts() {
        await this.productsBtn.click();
    }


    async clickCartButton() {
        await this.cartbutton.click();
    }


    async clickContactUsLink() {
        await this.contactUsLink.click();
    }

    async clickTestCasesLink() {
        await this.testCasesLink.first().click();
    }

}