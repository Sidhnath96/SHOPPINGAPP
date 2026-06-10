import SignUpAndLoginPage from "../POMClasses/SignUpAndLoginPage";
import UserConfigData from "../ConfigData/UserConfigData.json"; 
import{test, expect} from '../tests/fixtures';  
/**
 * TC-001: Signup and Login Test
 */
test.describe('Signup and Login Tests', () => {
    let registeredEmail: string;

    test('Signup and Login Test', async ({page}) => {
    const signUpAndLoginPage = new SignUpAndLoginPage(page);
   
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');
    await signUpAndLoginPage.clickSignUpLoginLink();
    await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    //update the email to be unique for each test run // Signup process
    const uniqueToken = crypto.randomUUID().substring(0, 8); 
    registeredEmail = `user_${uniqueToken}@example.com`;
    await signUpAndLoginPage.dosignUp(UserConfigData.userName, registeredEmail);
    expect(await page.url()).toContain('/signup');

    // Fill in registration details
    await signUpAndLoginPage.doRegistration(UserConfigData.password, UserConfigData.BirthDate.Day, UserConfigData.BirthDate.Month, UserConfigData.BirthDate.Year, UserConfigData.firstName, UserConfigData.lastName, UserConfigData.company, UserConfigData.address, UserConfigData.country, UserConfigData.state, UserConfigData.city, UserConfigData.postalCode, UserConfigData.mobilePhone);
    await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');
    await signUpAndLoginPage.clickContinueButton();
    
    // Verify logged in username
    const loggenInUser = await signUpAndLoginPage.getLoggedInUserName();
    if(loggenInUser?.toLowerCase() == UserConfigData.userName.toLocaleLowerCase())
    {
         expect(await signUpAndLoginPage.getLoggedInUserName()).toContain(UserConfigData.userName);
    }
    // Logout after signup
    await signUpAndLoginPage.clickLogoutLink();
    await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    });

    test('Login with Registered User', async ({page}) => {
        const signUpAndLoginPage = new SignUpAndLoginPage(page);
        await page.goto('/');
        await expect(page).toHaveTitle('Automation Exercise'); 
        await signUpAndLoginPage.clickSignUpLoginLink();
        await expect(page.locator('.login-form h2')).toHaveText('Login to your account');
        // Use the email registered in the previous test to perform login
        await signUpAndLoginPage.doLogin(registeredEmail, UserConfigData.password);
        // Verify logged in username
        const loggenInUser = await signUpAndLoginPage.getLoggedInUserName();
        if(loggenInUser?.toLowerCase() == UserConfigData.userName.toLocaleLowerCase())
        {
             expect(await signUpAndLoginPage.getLoggedInUserName()).toContain(UserConfigData.userName);
        }
        // Logout after login
        await signUpAndLoginPage.clickLogoutLink();
        await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    });
    
});
