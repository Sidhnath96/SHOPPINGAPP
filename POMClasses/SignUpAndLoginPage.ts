import { Page, Locator } from '@playwright/test';

export default class SignUpAndLoginPage {
  // 1. Change locator types from string/number to Locator
  page: Page;
  signUpLoginLink: Locator;
  signUpNameInput: Locator;
  signUpEmailInput: Locator;
  signUpButton: Locator;
  loginEmailInput: Locator;
  loginPasswordInput: Locator;
  loginButton: Locator;
  titleMrRadio: Locator;
  titleMrsRadio: Locator;
  passwordInput: Locator;
  dayOfBirthSelect: Locator;
  monthOfBirthSelect: Locator;
  yearOfBirthSelect: Locator;  
  firstNameInput: Locator;
  lastNameInput: Locator;
  companyInput: Locator;
  address1Input: Locator;
  countrySelect: Locator;
  stateInput: Locator;
  cityInput: Locator;
  zipcodeInput: Locator;
  mobileNumberInput: Locator;
  createAccountButton: Locator;
  continueButton: Locator;
  logoutlink: Locator;
  newsletterCheckbox: Locator;
  specialOffersCheckbox: Locator;
  loggedInUserName: Locator;

  // 2. Type the incoming constructor argument as Page
  constructor(page: Page) {
    this.page = page;
    
    // signup and login page locators
    this.signUpLoginLink = page.locator('a[href="/login"]');
    this.signUpNameInput = page.getByPlaceholder('Name');
    this.signUpEmailInput = page.locator('[data-qa="signup-email"]');
    this.signUpButton = page.getByRole('button', { name: 'Signup' });

    // locators for registration details
    this.titleMrRadio = page.locator('input[id="id_gender1"]');
    this.titleMrsRadio = page.locator('input[id="id_gender2"]');
    this.passwordInput = page.locator('input[id="password"]');
    this.dayOfBirthSelect = page.locator('select[id="days"]');
    this.monthOfBirthSelect = page.locator('select[id="months"]');
    this.yearOfBirthSelect = page.locator('select[id="years"]');

    // checkboxes for newsletter and special offers
    this.newsletterCheckbox = page.getByLabel('Sign up for our newsletter!');
    this.specialOffersCheckbox = page.getByLabel('Receive special offers from our partners!');

    // Address details locators
    this.firstNameInput = page.locator('input[id="first_name"]');
    this.lastNameInput = page.locator('input[id="last_name"]'); 
    this.companyInput = page.locator('input[id="company"]');
    this.address1Input = page.locator('input[id="address1"]');
    this.countrySelect = page.locator('select[id="country"]');
    this.stateInput = page.locator('input[id="state"]');
    this.cityInput = page.locator('input[id="city"]');
    this.zipcodeInput = page.locator('input[id="zipcode"]');
    this.mobileNumberInput = page.locator('input[id="mobile_number"]');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });

    //continue button locator after successful registration
    this.continueButton = page.locator('[data-qa="continue-button"]');

    //logged in user name locator
    this.loggedInUserName = page.locator("//a[contains(text(),' Logged in as ')]/b"); 

    // locators for login
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');

    //logout locator
    this.logoutlink = page.getByRole('link', { name: ' Logout' })
  }

  //click on signup/login link
  async clickSignUpLoginLink() {
    await this.signUpLoginLink.click();
  }

  //complete signup
  async dosignUp(name:string, email:string) {
    await this.signUpNameInput.fill(name);
    await this.signUpEmailInput.fill(email);
     await this.signUpButton.click();
  }

  //start filling registration details
  async doRegistration(password: string, dayOfBirth: string, monthOfBirth: string, yearOfBirth: string, fname: string, lname: string, company: string, address: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) {
    // if (title === 'Mr') {
    //   await this.titleMrRadio.check();
    // } else {
    //   await this.titleMrsRadio.check();
    // }
    await this.titleMrRadio.check(); // default to Mr for simplicity
    await this.passwordInput.fill(password);
    await this.dayOfBirthSelect.selectOption(dayOfBirth);
    await this.monthOfBirthSelect.selectOption(monthOfBirth);
    await this.yearOfBirthSelect.selectOption(yearOfBirth);

    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    //fill address details
    await this.firstNameInput.fill(fname);
    await this.lastNameInput.fill(lname);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address);
    await this.countrySelect.selectOption(country);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobileNumber);
    await this.createAccountButton.click();
  }
 
  //cick continue button after successful registration
  async clickContinueButton() {
    await this.continueButton.click();
  }

  // click logout link
  async clickLogoutLink() {
    await this.logoutlink.click();
  }

  //logged in user name
  async getLoggedInUserName() {
    return await this.loggedInUserName.textContent();
  } 

  async doLogin(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  } 
}
