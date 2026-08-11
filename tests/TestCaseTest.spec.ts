import {expect, test} from '../tests/fixtures';
import TestCasePage from '../POMClasses/TestCasePage';
import HomePage from '../POMClasses/HomePage';

test('Verify test case page visibility and test cases count', async ({page}) => {
    const testCasePage = new TestCasePage(page);
    const homePage = new HomePage(page);
    await page.goto('/');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    await expect(page,"Expected title to be Automation Exercise").toHaveTitle('Automation Exercise');  
    // Click on Test Cases button
    await homePage.clickTestCasesLink();
    await expect(page,"Expected URL to be /test_cases").toHaveURL('/test_cases');
    // Verify the list of test cases is visible
   expect(await testCasePage.getTestCasesCount(),"Expected 26 test cases").toEqual(26);

});