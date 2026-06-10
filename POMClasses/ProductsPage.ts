import { Page, Locator } from '@playwright/test';


export default class ProductsPage {
    page: Page;
    productsBtn :Locator;
    productNameOnProductsPage: Locator;
    productPriceOnProductsPage: Locator;
    viewProductBtn: Locator;
    addToCartBtnOnProductsPage: Locator;
    womenCategoryOnProductsPage: Locator;
    menCategoryOnProductsPage: Locator;
    kidsCategoryOnProductsPage: Locator;
    productsCards: Locator;

    constructor(page: Page) {
    this.page = page;
    this.productsBtn = page.getByRole('link', { name: ' Products' });
    this.productsCards = page.locator('.features_items div.col-sm-4');
    this.productNameOnProductsPage = page.locator('.productinfo p');
    this.productPriceOnProductsPage = page.locator('.product-information span').nth(0);
    this.viewProductBtn = page.getByRole('link',{name:"View Product"});
    this.addToCartBtnOnProductsPage = page.getByRole('button', { name: 'Add to cart' });
    this.womenCategoryOnProductsPage = page.locator('data-testid=women-category');
    this.menCategoryOnProductsPage = page.locator('data-testid=men-category');
    this.kidsCategoryOnProductsPage = page.locator('data-testid=kids-category');
    }

    async clickViewProducts() {
        await this.productsBtn.click();
    }

    async clickViewProductDetailsBasedOnProductName(prodName: string) {
        // Filter the product cards to find the one that contains the specified product name
        for(let i = 0; i < await this.productsCards.count(); i++)
        {
            const productCard = this.productsCards.nth(i);
            const productName = await productCard.locator('.productinfo p').textContent();
            // console.log(productName);

            if(productName === prodName)
            {
                await productCard.getByRole('link', { name: 'View Product' }).click();
                // console.log(`Clicked on View Product for ${prodName}`);
                break;
            }
        }    
       
    }
    


    // Method to add product to cart based on product name --> need to improve
    // async clickAddToCartBasedOnProductName(prodName: string) {
    //     // Filter the product cards to find the one that contains the specified product name and add it to the cart
    //     const productCard = this.productsCards.filter({ has: this.productName.filter({ hasText: prodName }) });
    //     await productCard.getByRole('button', { name: 'Add to cart' }).click();
    // }


}