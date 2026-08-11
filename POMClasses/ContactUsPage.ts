import { Page, Locator } from '@playwright/test';

export default class ContactUsPage {

    page:Page;
    nameInput:Locator;
    emailInput:Locator;
    subjectInput:Locator;
    messageInput:Locator;
    submitButton:Locator;
    fileUploadInput:Locator;
    successMessage:Locator;
    homeButton:Locator;

    constructor(page:Page) {

        // locators from contact us page
        this.page = page;
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[name="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        this.submitButton = page.locator("//input[@name='submit']");
        this.fileUploadInput = page.getByRole('button', { name: 'Choose File' });
        this.successMessage = page.locator('//div[@class="status alert alert-success"]');
        this.homeButton = page.getByRole('button', { name: 'Home' });

        //file upload/attachement scenario is not yet automated in this file

    }
    
    async fillContactUsForm(name:string, email:string, subject:string, message:string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    
        /**
         * After clicking submit button, a pop-up will apperar.
         * Use popupHandle class to handle the pop-up and accept it, then verify the success message on the page.
         */
    }
    async clicksubmitContactUsForm() {
    // console.log("Before click");
    await this.submitButton.click({ noWaitAfter: true });
    // console.log("After click");

    }
    async SuccessMessage() {
        //returning locator instead of text to utilize Playwright's auto-waiting feature for the element to be visible and contain the expected text
        return this.successMessage;
    }
 }

