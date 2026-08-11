import {test, expect} from './fixtures';
import SignUpAndLoginPage from '../POMClasses/SignUpAndLoginPage';
import UserConfigData from "../ConfigData/UserConfigData.json"; 
import ProductsPage from '../POMClasses/ProductsPage';
import HomePage from '../POMClasses/HomePage';
import CartPage from '../POMClasses/CartPage';

test('End-to-End Single Product Purchase Flow', async ({page}) => {
    const signUpAndLoginPage = new SignUpAndLoginPage(page);
    const productsPage = new ProductsPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    // Navigate to the home page
    await page.goto('/');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    await expect(page).toHaveTitle('Automation Exercise');

    //product to be searched and added to cart is "Frozen Tops For Kids"
    const productToSearch = 'Frozen Tops For Kids';
    //perform login with registered user
    await test.step('Login with Registered User', async () => {
        await signUpAndLoginPage.doLogin(UserConfigData.email, UserConfigData.password);
        //verify successful login by checking the logged in username
        expect(await signUpAndLoginPage.getLoggedInUserName(),"User logged in succesfully").toContain(UserConfigData.userName);
    });

    //click on products link to navigate to products page, search product and add to cart
    await test.step('search single product and add to cart', async () => {
        //click on products link to navigate to products page
        await homePage.clickViewProducts();
        await expect(page).toHaveURL('/products');
        // search product
        await productsPage.searchProductByName(productToSearch);
        //verify that searched product is displayed
        const productName = await productsPage.productNameOnProductsPage.first().textContent();
        expect(productName).toBe(productToSearch);
        //add product to cart based on product name
        await productsPage.addProductToCart(productToSearch);
        await expect(productsPage.cartbtnOnModal).toBeVisible();
        await productsPage.clickCartButtonOnModal();
        await expect(page).toHaveURL('/view_cart');
        
    });
    //verify that product is displayed in cart page
    await test.step('verify product is displayed in cart page', async () => {
       await page.waitForEvent('load');
       expect(await cartPage.getProductNameOnCart(productToSearch),"Product name does not match").toBe('Frozen Tops For Kids');
       expect(await cartPage.getProductPriceOnCart(productToSearch),"Product price does not match").toBe('Rs. 278');
    //    expect(await cartPage.getQuantity(productToSearch),"Product quantity does not match").toBe('1');
    //    expect(await cartPage.getProductTotalPriceOnCart(productToSearch),"Product total price does not match").toBe('Rs. 278');
       //navigate to checkout page
        await cartPage.clickCheckoutButtonOnCartPage();
        await expect(page).toHaveURL('/checkout');
    });

    

    
});