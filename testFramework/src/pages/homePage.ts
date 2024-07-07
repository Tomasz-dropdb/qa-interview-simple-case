import { expect, type Locator, type Page } from '@playwright/test';
import LoginPage from './loginPage';

export default class HomePage {
  readonly page: Page;
  private readonly _logoutButton: Locator;
  private readonly _title: Locator;
  private readonly _welcomeMessage: Locator;

  private constructor(page: Page) {
    this.page = page;
    this._logoutButton = page.getByTestId('logout');
    this._title = page.getByTestId('title');
    this._welcomeMessage = page.getByTestId('welcomeMessage');
  }

  public static async CreateAsync (page : Page) : Promise<HomePage> {
    const instance : HomePage = new HomePage(page);
    await instance.loadPage();
    
    return instance;
}

  private async loadPage() {
    await expect(this._title).toBeVisible();
  }

  public async logout() : Promise<LoginPage> {
    await this._logoutButton.click();

    return LoginPage.CreateAsync(this.page);
  }

  public async getWelcomeMessage() : Promise<string> {
    const welcomeText : string | null = await this._welcomeMessage.textContent();

    if(welcomeText === null) {
      throw new Error('Home Page does not render welcome message!');
    }

    return welcomeText;
  }
}
