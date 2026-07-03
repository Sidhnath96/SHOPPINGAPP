import { Page, Locator } from '@playwright/test';


export default class ProductsPage {
    page: Page;
    productNameOnProductsPage: Locator;
    productPriceOnProductsPage: Locator;
    viewProductBtn: Locator;
    womenCategoryOnProductsPage: Locator;
    menCategoryOnProductsPage: Locator;
    kidsCategoryOnProductsPage: Locator;
    productsCards: Locator;
    productName: Locator;
    cartbtnOnModal: Locator;
    continueShoppingBtnOnModal: Locator;
    searchInput: Locator;
    searchButton: Locator;

    constructor(page: Page) {
    this.page = page;
    this.productsCards = page.locator('.features_items div.col-sm-4');
    this.productNameOnProductsPage = page.locator('.productinfo p');
    this.productPriceOnProductsPage = page.locator('.product-information span').nth(0);
    this.viewProductBtn = page.getByRole('link',{name:"View Product"});
    this.womenCategoryOnProductsPage = page.locator('data-testid=women-category');
    this.menCategoryOnProductsPage = page.locator('data-testid=men-category');
    this.kidsCategoryOnProductsPage = page.locator('data-testid=kids-category');
    this.productName = page.locator('.productinfo p');
    this.cartbtnOnModal = page.getByRole('link', { name: 'View Cart' });
    this.continueShoppingBtnOnModal = page.getByRole('button', { name: 'Continue Shopping' });  
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
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
    async addProductToCart(prodName: string) {
        // Filter the product cards to find the one that contains the specified product name and add it to the cart
        for(let i = 0; i < await this.productsCards.count(); i++)
        {
            const productCard = this.productsCards.nth(i);
            const productName = await productCard.locator('.productinfo p').textContent();
            if(productName === prodName)
            {
                await productCard.hover();
                await productCard.locator('.product-overlay').getByText('Add to cart').nth(i).click();
                break;
            }
        }

    }

    //click cart button on modal after adding product to cart
    async clickCartButtonOnModal() {
        await this.cartbtnOnModal.click();
    }   

    //click continue shopping button on modal after adding product to cart
    async clickContinueShoppingButtonOnModal() {
        await this.continueShoppingBtnOnModal.click();
    }

    //search product by name
    async searchProductByName(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

}