import UserConfigData from "../ConfigData/UserConfigData.json";
import ContactUs from "../POMClasses/ContactUsPage";
import{test, expect} from '../tests/fixtures';
import HomePage from "../POMClasses/HomePage";

test('Contact Us Form Submission Test', async ({page}) => {
    const contactUsPage = new ContactUs(page);
    const homePage = new HomePage(page);
    await page.goto('/');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    await expect(page,"Expected title to be Automation Exercise").toHaveTitle('Automation Exercise');    
    // Click on the "Contact Us" link to navigate to the contact form page
    await homePage.clickContactUsLink();
    await expect(page,"Expected URL to be /contact_us").toHaveURL('/contact_us');
        
    // Fill in the contact us form with test data
    await contactUsPage.fillContactUsForm(UserConfigData.firstName, UserConfigData.email, 'Test Subject', 'This is a test message for the contact us form.');
    // FIX: Register the dialog listener natively before clicking the submit button to avoid missing the dialog event
    await Promise.all([
        page.waitForEvent('dialog').then(async(dialog) => {
            expect(dialog.message()).toBe('Press OK to proceed!');
            await dialog.accept(); // Simulates clicking "OK"
        }), contactUsPage.submitContactUsForm(), 
    ]);
    //Assert directly on the locator to utilize Playwright's auto-waiting
    expect(await contactUsPage.verifySuccessMessage(),"Successfully submitted contact form").toBe('Success! Your details have been submitted successfully.');

});
