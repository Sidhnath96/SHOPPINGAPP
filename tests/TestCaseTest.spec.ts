
import{test, expect} from '../tests/fixtures';
import TestCasePage from '../POMClasses/TestCasePage';

test('Verify test case page visibility and test cases count', async ({page}) => {
    const testCasePage = new TestCasePage(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');  
    // Click on Test Cases button
    await testCasePage.clickOnTestCaseButton();
    expect(page.url()).toContain('/test_cases');

    // Verify the list of test cases is visible
   expect(await testCasePage.getTestCacesCount()).toEqual(26);

});