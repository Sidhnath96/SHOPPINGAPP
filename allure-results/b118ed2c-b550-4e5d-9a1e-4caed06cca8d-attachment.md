# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ContactUsTest.spec.ts >> Contact Us Form Submission Test
- Location: tests\ContactUsTest.spec.ts:6:5

# Error details

```
Error: Need more time to load the message

expect(locator).toHaveText(expected) failed

Locator:  locator('//div[@class="status alert alert-success"]')
Expected: "Success! Your details have been submitted successfully."
Received: ""
Timeout:  8000ms

Call log:
  - Need more time to load the message with timeout 8000ms
  - waiting for locator('//div[@class="status alert alert-success"]')
    - waiting for navigation to finish...
    - navigated to "https://automationexercise.com/contact_us"
    16 × locator resolved to <div class="status alert alert-success"></div>
       - unexpected value ""

```

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Signup / Login":
        - /url: /login
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
- heading "Contact Us" [level=2]:
  - text: Contact
  - strong: Us
- text: "Note: Below contact form is for testing purpose."
- heading "Get In Touch" [level=2]
- textbox "Name"
- textbox "Email"
- textbox "Subject"
- textbox "Your Message Here"
- button "Choose File"
- button "Submit"
- heading "Feedback For Us" [level=2]
- paragraph: We really appreciate your response to our website.
- paragraph:
  - text: Kindly share your feedback with us at
  - link "feedback@automationexercise.com":
    - /url: mailto:feedback@automationexercise.com
  - text: .
- paragraph: If you have any suggestion areas or improvements, do let us know. We will definitely work on it.
- paragraph: Thank you
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
  1  | import UserConfigData from "../ConfigData/UserConfigData.json";
  2  | import ContactUs from "../POMClasses/ContactUsPage";
  3  | import{test, expect} from '../tests/fixtures';
  4  | import HomePage from "../POMClasses/HomePage";
  5  | 
  6  | test('Contact Us Form Submission Test', async ({page}) => {
  7  |     const contactUsPage = new ContactUs(page);
  8  |     const homePage = new HomePage(page);
  9  |     await page.goto('/');
  10 |     await expect(page,"Expected title to be Automation Exercise").toHaveTitle('Automation Exercise');    
  11 |     // Click on the "Contact Us" link to navigate to the contact form page
  12 |     await homePage.clickContactUsLink();
  13 |     await expect(page,"Expected URL to be /contact_us").toHaveURL('/contact_us');
  14 |         
  15 |     // Fill in the contact us form with test data
  16 |     await contactUsPage.fillContactUsForm(UserConfigData.firstName, UserConfigData.email, 'Test Subject', 'This is a test message for the contact us form.');
  17 |     // FIX: Register the dialog listener natively before clicking the submit button to avoid missing the dialog event
  18 |     // await Promise.all([
  19 |     //     page.waitForEvent('dialog').then(async(dialog) => {
  20 |     //         expect(dialog.message()).toBe('Press OK to proceed!');
  21 |     //         await dialog.accept(); // Simulates clicking "OK"
  22 |     //     }),
  23 |     //     contactUsPage.clicksubmitContactUsForm()
  24 |     // ]);
  25 |     page.on('dialog', async dialog => {
  26 |     await dialog.accept();
  27 |     });
  28 | 
  29 |     await contactUsPage.clicksubmitContactUsForm();
  30 |     
  31 |     //Assert directly on the locator to utilize Playwright's auto-waiting
> 32 |     await expect(await contactUsPage.SuccessMessage(),"Need more time to load the message").toHaveText('Success! Your details have been submitted successfully.');
     |                                                                                             ^ Error: Need more time to load the message
  33 | 
  34 | });
  35 | 
```