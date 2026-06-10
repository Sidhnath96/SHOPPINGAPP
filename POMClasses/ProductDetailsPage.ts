import { Page, Locator } from '@playwright/test';


export default class ProductDDetailsPage {
    page: Page;
    productNameOnDetailsPage: Locator;
    productPriceOnDetailsPage: Locator;
    addToCartBtnOnDetailsPage: Locator;
    CategoryOnproductDetailsPage: Locator;
    productAvailabilityOnDetailsPage: Locator;
    productConditionOnDetailsPage: Locator;
    productBrandOnDetailsPage: Locator;

    constructor(page: Page) {
    this.page = page;
    this.productNameOnDetailsPage = page.locator('.product-information h2');
    this.productPriceOnDetailsPage = page.locator('.product-information span').nth(0);
    this.addToCartBtnOnDetailsPage = page.locator('button.cart');
    this.CategoryOnproductDetailsPage = page.locator('.product-information p').nth(0);
    this.productAvailabilityOnDetailsPage = page.locator('.product-information p').nth(1);
    this.productConditionOnDetailsPage = page.locator('.product-information p').nth(2);
    this.productBrandOnDetailsPage = page.locator('.product-information p').nth(3);
    }

    // Method to check product name on product details page
    async checkProductName()
    {
       let productName = await this.productNameOnDetailsPage.textContent();
         if(productName)        {
            productName = productName.trim(); // Remove leading/trailing whitespace
        }
        return productName;
    }

    // Methods to check product availability on product details page
    async checkProductAvailability()
    {
        let productAvailability = await this.productAvailabilityOnDetailsPage.textContent();
        if(productAvailability)        {
            productAvailability = productAvailability.trim(); // Remove leading/trailing whitespace
        }
        return productAvailability;

    }

    // Methods to check product condition on product details page
    async checkProductCondition()
    {
        let productCondition = await this.productConditionOnDetailsPage.textContent();
        if(productCondition)        {
            productCondition = productCondition.trim(); // Remove leading/trailing whitespace
        }
        return productCondition;

    }

    // Methods to check product brand on product details page
    async checkProductBrand()
    {
       let productBrand = await this.productBrandOnDetailsPage.textContent();
         if(productBrand)        {
            productBrand = productBrand.trim(); // Remove leading/trailing whitespace
        }
        return productBrand;

    }
    // Method to check product price on product details page
    async checkProductPrice()
    {
        let price = await this.productPriceOnDetailsPage.textContent();
        if(price)        {
            price = price.trim(); // Remove leading/trailing whitespace
        }
        return price;
    }

}