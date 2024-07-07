import { expect, type Locator, type Page } from '@playwright/test';
import { User } from '../../../application/src/App';
import HomePage from 'src/pages/homePage';
import InvalidCredentialsError from 'src/errors/invalidCredentialsError';

export default class LoginPage {
  readonly page: Page;
  private readonly _emailInput: Locator;
  private readonly _invalidCredentialsMessage: Locator;
  private readonly _loginButton: Locator;
  private readonly _passwordInput: Locator;
  private readonly _signupLink: Locator;
  private readonly _title: Locator;

  private readonly _errorMessageTimeout : number = 50;

  private constructor(page: Page) {
    this.page = page;
    this._emailInput = page.locator('#email');
    this._invalidCredentialsMessage = page.getByTestId('invalidCredentialsMessage');
    this._loginButton = page.getByTestId('login');
    this._passwordInput = page.locator('#password');
    this._signupLink = page.getByTestId('signup');
    this._title = page.getByTestId('title');
  }

  public static async CreateAsync (page : Page) : Promise<LoginPage> {

    const instance : LoginPage = new LoginPage(page);
    await instance.goto();
    
    return instance;
}

  private async goto() {
    console.log(this.page.url);
    await this.page.goto('/login');
    await this.loadPage();
  }

  private async loadPage() {
    await expect(this._title).toBeVisible();
  }

  public async login(user : User) : Promise<HomePage> {

    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this._loginButton.click();

    if(!await this.isLoginCorrect()) {
      return await HomePage.CreateAsync(this.page);
    }

    throw new InvalidCredentialsError(user.email);
  }

  private async fillEmail(email : string) {

    await this._emailInput.fill(email);
  }

  private async fillPassword(password : string) {

    await this._passwordInput.fill(password);
  }

  private async isLoginCorrect() : Promise<boolean> {
    return await this._invalidCredentialsMessage.isVisible({timeout: this._errorMessageTimeout});
  }
}
