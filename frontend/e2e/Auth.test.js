import {pressBack} from './backButton';

describe('Auth Operations', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('Sign Up')).tap();

    await element(by.id('username-input')).typeText('testuser');
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('testpassword');

    await element(by.id('signup-btn')).tap();
  });

  it('should register the user and redirect to login page', async () => {
    await expect(element(by.id('login-btn'))).toBeVisible();
  });

  it('should login successfully', async () => {
    await element(by.id('email-login')).typeText('test@example.com');
    await element(by.id('password-login')).typeText('testpassword');

    await element(by.id('login-btn')).tap();

    await expect(element(by.text('Financial Overview'))).toBeVisible();
  });

  it('should show the error message about wrong login credentials', async () => {
    await element(by.id('email-login')).typeText('error@example.com');
    await element(by.id('password-login')).typeText('testpassword');

    await element(by.id('login-btn')).tap();

    await expect(
      element(by.text('Wrong password or the user doesnt exist')),
    ).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should show the error message about signup', async () => {
    await pressBack();

    await element(by.id('signup-btn')).tap();

    await expect(
      element(by.text('Username or email is already taken')),
    ).toBeVisible();
    await element(by.text('OK')).tap();
  });
});
