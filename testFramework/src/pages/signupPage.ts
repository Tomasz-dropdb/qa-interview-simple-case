import { expect, type Locator, type Page } from '@playwright/test';
import { User } from '../../../application/src/App';
import LoginPage from './loginPage';
import HomePage from './homePage';

export default class SignupPage {
  readonly page: Page;
  private readonly _emailInput: Locator;
  private readonly _firstNameInput: Locator;
  private readonly _lastNameInput: Locator;
  private readonly _loginLink: Locator;
  private readonly _passwordInput: Locator;
  private readonly _submitButton: Locator;
  private readonly _title: Locator;

  private constructor(page: Page) {
    this.page = page;
    this._emailInput = page.locator('#email');
    this._firstNameInput = page.locator('#firstName');
    this._lastNameInput = page.locator('#lastName');
    this._loginLink = page.getByTestId('login');
    this._passwordInput = page.locator('#password');
    this._submitButton = page.getByTestId('submitButton');
    this._title = page.getByTestId('title');
  }

  public static async CreateAsync (page : Page) : Promise<SignupPage> {

    const instance : SignupPage = new SignupPage(page);

    await instance.loadPage();
    
    return instance;
  }

  public static async NavigateAndCreateAsync (page : Page) : Promise<SignupPage> {

    const instance : SignupPage = new SignupPage(page);

    await instance.goto();
    await instance.loadPage();
    
    return instance;
  }

  public async goto() : Promise <SignupPage> {
    await this.page.goto('/signup');

    return this;
  }

  private async loadPage() : Promise<boolean> {
    return await this._title.isVisible();
  }

  public async signup(user : User) : Promise<HomePage> {
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);

    if(await this.isSignupAvailable()){
      await this._submitButton.click();

      return HomePage.CreateAsync(this.page);
    }

    throw new Error(`Unable to signup user with details ${user}`);
  }

  private async fillEmail(email : string) {
    await this._emailInput.fill(email);
  }

  private async fillFirstName(name : string) {
    await this._firstNameInput.pressSequentially(name);
  }

  private async fillLastName(surname : string) {
    await this._lastNameInput.fill(surname);
  }

  private async fillPassword(password : string) {
    await this._passwordInput.fill(password);
  }

  private async isSignupAvailable() : Promise<boolean> {
    return !await this._submitButton.isDisabled();
  }

  public async gotoLogin() : Promise<LoginPage> {
    await this._loginLink.click();

    return LoginPage.CreateAsync(this.page);
  }
}
