import {expect, test} from '../tests/fixtures';
import TestCasePage from '../POMClasses/TestCasePage';

test('Verify test case page visibility and test cases count', async ({page}) => {
    const testCasePage = new TestCasePage(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');  
    console.log('Navigated to homepage and verified title');
    // Click on Test Cases button
    await testCasePage.clickOnTestCaseButton();
    expect(page.url()).toContain('/test_cases');
    console.log('Navigated to test cases page');

    // Verify the list of test cases is visible
   expect(await testCasePage.getTestCacesCount()).toEqual(26);
    console.log('Verified the count of test cases is 26');

});