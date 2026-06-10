import UserConfigData from "../ConfigData/UserConfigData.json";
import ContactUs from "../POMClasses/ContactUsPage";
import{test, expect} from '../tests/fixtures';

test('Contact Us Form Submission Test', async ({page}) => {
    const contactUsPage = new ContactUs(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');
    console.log('Navigated to homepage and verified title');    
    // Click on the "Contact Us" link to navigate to the contact form page
    await contactUsPage.clickContactUsLink();
    await expect(page.locator('#contact-page')).toContainText('Get In Touch');
    console.log('Clicked on Contact Us link and verified contact page heading');
    // FIX: Register the dialog listener natively right here to guarantee it catches the alert
    page.on('dialog', async (dialog) => {
        console.log(`Popup message seen: ${dialog.message()}`);
        expect(dialog.message()).toBe('Press OK to proceed!');
        await dialog.accept(); // Simulates clicking "OK"
    });
   
    // Fill in the contact us form with test data
    await contactUsPage.fillContactUsForm(UserConfigData.firstName, UserConfigData.email, 'Test Subject', 'This is a test message for the contact us form.');
    console.log('Filled contact us form with test data');
    // console.log('Success Message:', successMessage);
    await page.waitForTimeout(5000); // Wait for the success message to appear after form submission
    await contactUsPage.submitContactUsForm();
    console.log('Submitted contact us form');
    //Assert directly on the locator to utilize Playwright's auto-waiting
    await expect(contactUsPage.successMessage).toContainText('Success! Your details have been submitted successfully.');
    console.log('Verified success message after form submission');

}); 
