import SignUpAndLoginPage from "../POMClasses/SignUpAndLoginPage";
import UserConfigData from "../ConfigData/UserConfigData.json"; 
import{test, expect} from '../tests/fixtures';  
/**
 * TC-001: Signup and Login Test
 */
test('New User Signup Test', async ({page}) => {
    let registeredEmail: string;
    function generateEmail(){
        const uniqueToken = crypto.randomUUID().substring(0, 5); 
        return `user_${uniqueToken}@example.com`;

    }

    const signUpAndLoginPage = new SignUpAndLoginPage(page);   
    await page.goto('/');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    await expect(page).toHaveTitle('Automation Exercise');
    await signUpAndLoginPage.clickSignUpLoginLink();
    await expect(page).toHaveURL('/login');
    //update the email to be unique for each test run // Signup process
    registeredEmail=generateEmail();
    await signUpAndLoginPage.dosignUp(UserConfigData.userName, registeredEmail);
    await expect(page).toHaveURL('/signup');

    // Fill in registration details
    await signUpAndLoginPage.doRegistration(UserConfigData.password, UserConfigData.BirthDate.Day, UserConfigData.BirthDate.Month, UserConfigData.BirthDate.Year, UserConfigData.firstName, UserConfigData.lastName, UserConfigData.company, UserConfigData.address, UserConfigData.country, UserConfigData.state, UserConfigData.city, UserConfigData.postalCode, UserConfigData.mobilePhone);
    expect(await signUpAndLoginPage.getAccountCreatedMessage()).toContain('Account Created!');
    await signUpAndLoginPage.clickContinueButton();
    
    // Verify logged in username
    expect(await signUpAndLoginPage.getLoggedInUserName()).toContain(UserConfigData.userName);
    // Logout after signup
    await signUpAndLoginPage.clickLogoutLink();
    await expect(page).toHaveURL('/login');
});

