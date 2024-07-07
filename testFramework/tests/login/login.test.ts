import { test, expect } from '@playwright/test';
import { existingUsers } from 'testHooks/setup.hook';
import { User } from '../../../application/src/App';
import HomePage from 'src/pages/homePage';
import InvalidCredentialsError from 'src/errors/invalidCredentialsError';
import LoginPage from 'src/pages/loginPage';
import ArrayUtils from 'src/utils/arrayUtils';

test.describe.configure({ mode: 'serial' })

test.describe('Login form tests', () => {
  test('Logging in works with existing account', async ({ page }) => {

    const existingUser : User = ArrayUtils.GetRandomElement<User>(existingUsers);
    
    const loginPage : LoginPage = await LoginPage.NavigateAndCreateAsync(page);

    const homePage : HomePage = await loginPage.login(existingUser);
    const welcomeMessage : string = await homePage.getWelcomeMessage();

    expect(welcomeMessage).toContain(`Welcome ${existingUser.firstName} ${existingUser.lastName}`);
  })

  test('Logging in does not work with non-existing account', async ({ page }) => {

    const nonExistingUser : User = {
      email : 'empty@email.com',
      password : '1@Password',
      firstName : 'NonExisting',
      lastName : 'AlsoNonExisting'};
    
    const loginPage : LoginPage = await LoginPage.NavigateAndCreateAsync(page);

    try {
      await loginPage.login(nonExistingUser)
    } catch (e : any) {
      expect(e).toBeInstanceOf(InvalidCredentialsError);
      expect(e.message).toContain(InvalidCredentialsError.MessagePattern);
    }
  })
})
