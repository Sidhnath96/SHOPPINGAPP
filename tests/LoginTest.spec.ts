import { test, expect } from '../tests/fixtures';
import SignUpAndLoginPage from '../POMClasses/SignUpAndLoginPage';
import UserConfigData from '../ConfigData/UserConfigData.json';

test('Login with Registered User', async ({page}) => {
        const signUpAndLoginPage = new SignUpAndLoginPage(page);
        await page.goto('/');
        await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
        await expect(page).toHaveTitle('Automation Exercise'); 
        
        await signUpAndLoginPage.clickSignUpLoginLink();
        expect(page.url()).toContain('/login');
        // Use the email registered in the previous test to perform login
        await signUpAndLoginPage.doLogin(UserConfigData.email, UserConfigData.password);
        // Verify logged in username
        const loggenInUser = await signUpAndLoginPage.getLoggedInUserName();
        expect(await signUpAndLoginPage.getLoggedInUserName()).toContain(UserConfigData.userName);
        
        // Logout after login
        await signUpAndLoginPage.clickLogoutLink();
        expect(page.url()).toContain('/login');
    });
    