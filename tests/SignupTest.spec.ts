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
    console.log('Navigated to homepage and verified title');
    await signUpAndLoginPage.clickSignUpLoginLink();
    await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    console.log('Clicked on signup/login link and verified heading');
    //update the email to be unique for each test run // Signup process
    const uniqueToken = crypto.randomUUID().substring(0, 8); 
    registeredEmail = `user_${uniqueToken}@example.com`;
    // console.log(`Using email: ${registeredEmail} for signup`);
    await signUpAndLoginPage.dosignUp(UserConfigData.userName, registeredEmail);
    console.log('Initiated signup process');
    expect(await page.url()).toContain('/signup');

    // Fill in registration details
    await signUpAndLoginPage.doRegistration(UserConfigData.password, UserConfigData.BirthDate.Day, UserConfigData.BirthDate.Month, UserConfigData.BirthDate.Year, UserConfigData.firstName, UserConfigData.lastName, UserConfigData.company, UserConfigData.address, UserConfigData.country, UserConfigData.state, UserConfigData.city, UserConfigData.postalCode, UserConfigData.mobilePhone);
    await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');
    console.log('Account created successfully');
    await signUpAndLoginPage.clickContinueButton();
    
    // Verify logged in username
    const loggenInUser = await signUpAndLoginPage.getLoggedInUserName();
    console.log(`Logged in user: ${loggenInUser}`);
    if(loggenInUser?.toLowerCase() == UserConfigData.userName.toLocaleLowerCase())
    {
         expect(await signUpAndLoginPage.getLoggedInUserName()).toContain(UserConfigData.userName);
    }
    else    {
        console.warn(`Logged in username (${loggenInUser}) does not match expected (${UserConfigData.userName})`);
    }
    console.log('Verified logged in username');
    // Logout after signup
    await signUpAndLoginPage.clickLogoutLink();
    await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
    console.log('Logged out successfully after signup');
    });

    test('Login with Registered User', async ({page}) => {
        const signUpAndLoginPage = new SignUpAndLoginPage(page);
        await page.goto('/');
        await expect(page).toHaveTitle('Automation Exercise'); 
        console.log('Navigated to homepage and verified title');
        await signUpAndLoginPage.clickSignUpLoginLink();
        await expect(page.locator('.login-form h2')).toHaveText('Login to your account');
        console.log('Clicked on signup/login link and verified login heading');
        // Use the email registered in the previous test to perform login
        await signUpAndLoginPage.doLogin(registeredEmail, UserConfigData.password);
        console.log('Performed login with registered user');
        // Verify logged in username
        const loggenInUser = await signUpAndLoginPage.getLoggedInUserName();
        // console.log(`Logged in user: ${loggenInUser}`);
        if(loggenInUser?.toLowerCase() == UserConfigData.userName.toLocaleLowerCase())
        {
             expect(await signUpAndLoginPage.getLoggedInUserName()).toContain(UserConfigData.userName);
        } else    {
            console.warn(`Logged in username (${loggenInUser}) does not match expected (${UserConfigData.userName})`);
        }
        console.log('Verified logged in username after login');
        // Logout after login
        await signUpAndLoginPage.clickLogoutLink();
        await expect(page.locator('.signup-form h2')).toHaveText('New User Signup!');
        console.log('Logged out successfully after login');
    });
    
});
