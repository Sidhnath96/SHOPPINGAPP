import SignUpAndLoginPage from "../POMClasses/SignUpAndLoginPage";
import UserConfigData from "../ConfigData/UserConfigData.json";
import ContactUs from "../POMClasses/ContactUsPage";
import {test, expect} from '@playwright/test';

test('Contact Us Form Submission Test', async ({page}) => {
    const contactUsPage = new ContactUs(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');
    await contactUsPage.clickContactUsLink();
    await expect(page.locator('#contact-page')).toContainText('Get In Touch');
    // FIX: Register the dialog listener natively right here to guarantee it catches the alert
    page.on('dialog', async (dialog) => {
        console.log(`Popup message seen: ${dialog.message()}`);
        expect(dialog.message()).toBe('Press OK to proceed!');
        await dialog.accept(); // Simulates clicking "OK"
    });

    await contactUsPage.fillContactUsForm(UserConfigData.firstName, UserConfigData.email, 'Test Subject', 'This is a test message for the contact us form.');
    
    // console.log('Success Message:', successMessage);
    await page.waitForTimeout(5000); // Wait for the success message to appear after form submission
    await contactUsPage.submitContactUsForm();
    
    //Assert directly on the locator to utilize Playwright's auto-waiting
   await expect(contactUsPage.successMessage).toContainText('Success! Your details have been submitted successfully.');


}); 
