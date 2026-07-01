import{test, expect} from '../tests/fixtures';
import ProductsPage  from '../POMClasses/ProductsPage';
import ProductDetailsPage from '../POMClasses/ProductDetailsPage';

test('View Product Details',async({page}) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Automation Exercise');
    await productsPage.clickViewProducts();
    await expect(page).toHaveURL('/products');
    await productsPage.clickViewProductDetailsBasedOnProductName('Blue Top');
    expect(await productDetailsPage.checkProductName()).toBe('Blue Top');
    expect(await productDetailsPage.checkProductPrice()).toContain('Rs. 500');
    expect(await productDetailsPage.checkProductAvailability()).toContain('Availability: In Stock');
    expect(await productDetailsPage.checkProductCondition()).toContain('Condition: New');
    expect(await productDetailsPage.checkProductBrand()).toContain('Brand: Polo');
})