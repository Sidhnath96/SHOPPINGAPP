import {Locator,Page} from '@playwright/test';
export default class CartPage{
    page :Page;
    productNameOnCartPage: Locator;
    priceOnCartPage: Locator;
    quantityOnCartPage: Locator;
    totalPriceOnCartPage: Locator;
    checkoutButtonOnCartPage: Locator;
    deleteButtonOnCartPage: Locator;
    cartTableRow: Locator;
    cartTable: Locator;
    constructor(page:Page)
    {
        this.page= page;
        this.productNameOnCartPage= page.locator('.cart_description h4 a');
        this.priceOnCartPage= page.locator('.cart_price p').last();
        this.quantityOnCartPage= page.locator('.cart_quantity button');
        this.totalPriceOnCartPage= page.locator('.cart_total_price');
        this.checkoutButtonOnCartPage= page.getByText('Proceed To Checkout')
        this.deleteButtonOnCartPage= page.locator('.cart_quantity_delete');
        this.cartTableRow= page.locator('tbody tr');
        this.cartTable = page.locator('#cart_info');

    }

    // Locate the row that contains the given product name
    async getProductRowByName(productName: string): Promise<Locator> {
    return this.cartTable.locator('tbody tr').filter({has: this.page.locator('.cart_description h4 a', { hasText: productName }),
    });
    }

    // 1. Get product name on cart (mainly to confirm exact match/casing)
  async getProductNameOnCart(productName: string): Promise<string> {
    const row = await this.getProductRowByName(productName);
    return (await row.locator('.cart_description h4 a').innerText()).trim();
  }

  // 2. Get product price on cart (unit price)
  async getProductPriceOnCart(productName: string): Promise<string> {
    const row = await this.getProductRowByName(productName);
    return (await row.locator('.cart_price p').innerText()).trim();
  }

    // 3. Get quantity for a specific product
  async getQuantity(productName: string): Promise<string> {
    const row = await this.getProductRowByName(productName);
    return (await row.locator('.cart_quantity button').innerText()).trim();
  }

  // 4. Get total price for that product row (price * qty)
  async getProductTotalPriceOnCart(productName: string) : Promise<string>{
    const row =await this.getProductRowByName(productName);
    return (await row.locator('.cart_total_price').innerText()).trim();
  }
 
  // 5. Get the overall cart total (grand total row, no product name)
  async getTotalPrice(): Promise<string> {
    const totalRow = await this.cartTable.locator('tbody tr').last();
    return (await totalRow.locator('.cart_total_price').innerText()).trim();
  }
   

    async clickCheckoutButtonOnCartPage()
    {
        await this.checkoutButtonOnCartPage.click();
    }

}