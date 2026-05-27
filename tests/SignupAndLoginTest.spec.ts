import SignUpAndLoginPage from "../POMClasses/SignUpAndLoginPage";
import UserConfigData from "../ConfigData/UserConfigData.json"; 
import {test, expect} from '@playwright/test';  


test('Signup and Login Test', async ({page}) => {
    const signUpAndLoginPage = new SignUpAndLoginPage(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');
    // Signup process
    await signUpAndLoginPage.signUpLoginLink.click();
    await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    await signUpAndLoginPage.signUpNameInput.fill(UserConfigData.userName);
    // await signUpAndLoginPage.signUpEmailInput.fill(UserConfigData.email);
    //update the email to be unique for each test run

    const uniqueToken = crypto.randomUUID().substring(0, 8); 
    const uniqueEmail = `user_${uniqueToken}@example.com`;

    await signUpAndLoginPage.signUpEmailInput.fill(uniqueEmail);
    console.log(`Using email: ${uniqueEmail} for signup`);

    await signUpAndLoginPage.signUpButton.click();

    expect(await page.url()).toContain('/signup');

    await signUpAndLoginPage.titleMrRadio.check();
    await signUpAndLoginPage.passwordInput.fill(UserConfigData.password);
    await signUpAndLoginPage.dayOfBirthSelect.selectOption(UserConfigData.BirthDate.Day);
    await signUpAndLoginPage.monthOfBirthSelect.selectOption(UserConfigData.BirthDate.Month);
    await signUpAndLoginPage.yearOfBirthSelect.selectOption(UserConfigData.BirthDate.Year);
    await signUpAndLoginPage.firstNameInput.fill(UserConfigData.firstName);
    await signUpAndLoginPage.lastNameInput.fill(UserConfigData.lastName);
    await signUpAndLoginPage.companyInput.fill(UserConfigData.company);
    await signUpAndLoginPage.address1Input.fill(UserConfigData.address);
    await signUpAndLoginPage.countrySelect.selectOption(UserConfigData.country);
    await signUpAndLoginPage.stateInput.fill(UserConfigData.state);
    await signUpAndLoginPage.cityInput.fill(UserConfigData.city);
    await signUpAndLoginPage.zipcodeInput.fill(UserConfigData.postalCode);
    await signUpAndLoginPage.mobileNumberInput.fill(UserConfigData.mobilePhone);
    await signUpAndLoginPage.createAccountButton.click();

    await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');

    await signUpAndLoginPage.continueButton.click();
    /**
     * Validate below step tommorrow
     * await expect(page.locator('a[data-qa="logout"]')).toBeVisible();
     */
    

    // Logout after signup
    await signUpAndLoginPage.clickLogoutLink();
    await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');

});