import{test, expect} from '../tests/fixtures';
import ProductsPage  from '../POMClasses/ProductsPage';
import ProductDetailsPage from '../POMClasses/ProductDetailsPage';

test('View Product Details',async({page}) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await page.goto('/');
    console.log('Navigated to homepage');
    await expect(page).toHaveTitle('Automation Exercise');
    console.log('Verified homepage title');
    await productsPage.clickViewProducts();
    await expect(page).toHaveURL('/products');
    console.log('Navigated to products page');
    await productsPage.clickViewProductDetailsBasedOnProductName('Blue Top');
    console.log('Clicked on product details');
    expect(await productDetailsPage.checkProductName()).toBe('Blue Top');
    console.log('Verified product name on details page');
    expect(await productDetailsPage.checkProductPrice()).toContain('Rs. 500');
    console.log('Verified product price on details page');
    expect(await productDetailsPage.checkProductAvailability()).toContain('Availability: In Stock');
    console.log('Verified product availability on details page');
    expect(await productDetailsPage.checkProductCondition()).toContain('Condition: New');
    console.log('Verified product condition on details page');
    expect(await productDetailsPage.checkProductBrand()).toContain('Brand: Polo');
    console.log('Verified product brand on details page');

    //for verification purpose only
    // console.log(await productDetailsPage.checkProductPrice());
    // console.log(await productDetailsPage.checkProductAvailability());
    // console.log(await productDetailsPage.checkProductCondition());
    // console.log(await productDetailsPage.checkProductBrand());
})