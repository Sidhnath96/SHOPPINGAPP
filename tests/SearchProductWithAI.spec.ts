import{test, expect} from '../tests/fixtures';
import { ai } from '@zerostep/playwright';

test('Search Product with AI', async ({ page }) => {

    const aiArgs = {test, page} //arguments to be passed to the AI function, you can pass any data that you want the AI to consider while generating the test steps
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');
    // Call the AI function to generate test steps for searching a product
    await ai('click on Products link from shop-menu',aiArgs);
    const pageTitle = await ai('After navigating to products verify that "All PRODUCTS" text is displayed below the search bar',aiArgs);
    expect(pageTitle).toBeTruthy;

    //Perform search with ai 
    await ai('Enter the product name as "Tshirt" in the Search Product input box and click on search button', aiArgs);
    let productTitle = await ai('Get all the product names or titles from the results', aiArgs);
    let productCount = await ai('Count the number of products dispalyed in result', aiArgs);
    console.log(productCount);
    console.log(productTitle);
    

});