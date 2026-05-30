import SignUpAndLoginPage from "../POMClasses/SignUpAndLoginPage";
import UserConfigData from "../ConfigData/UserConfigData.json"; 
import {EmailGenerator} from "../Utility/EmailGenerator";
import {test, expect} from '@playwright/test';  

test('Login with existing user and delete account', async ({page}) => {
    const signUpAndLoginPage = new SignUpAndLoginPage(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');

    
});

