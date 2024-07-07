import { existingUsers } from 'testHooks/setup.hook';
import { test, expect } from '@playwright/test';
import { User } from '../../../application/src/App';
import ArrayUtils from 'src/utils/arrayUtils';
import HomePage from 'src/pages/homePage';
import SignupPage from 'src/pages/signupPage';

test.describe.configure({ mode: 'serial' })

test.describe('Signup form tests', () => {
  test('Sign up works with proper data', async ({ page }) => {

    const signupPage : SignupPage = await SignupPage.NavigateAndCreateAsync(page);

    const newUser : User = {
        email : 'empty@email.com',
        password : '1@Password',
        firstName : 'NewUserName',
        lastName : 'NewUserSurname'};

    let homePage : HomePage = await signupPage.signup(newUser);

    const loginPage = await homePage.logout();
    
    homePage = await loginPage.login(newUser);
    const welcomeMessage = await homePage.getWelcomeMessage();

    expect(welcomeMessage).toContain(`Welcome ${newUser.firstName} ${newUser.lastName}`);
  })

  //Will fail as there is no validation of alreday taken email address. To implement functionality by Dev Team.
  test.skip('Sign up does not work for already occupied email address', async ({ page }) => {

    const existingUserEmail : string = ArrayUtils.GetRandomElement<User>(existingUsers).email;

    const newUserWithTakenEmail : User = {
      email : existingUserEmail,
      password : '1@Password',
      firstName : 'NonExisting',
      lastName : 'AlsoNonExisting'};
    
    const signupPage : SignupPage = await SignupPage.NavigateAndCreateAsync(page);

    await expect(signupPage.signup(newUserWithTakenEmail)).rejects.toThrowError();
  })
})
