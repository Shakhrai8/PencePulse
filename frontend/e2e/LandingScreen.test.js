describe('Landing Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should play the logo animation', async () => {
    await expect(element(by.id('logo'))).toBeVisible();
  });

  it('should have welcome screen information', async () => {
    await expect(element(by.text('Welcome to PencePulse'))).toBeVisible();
    await expect(
      element(by.text('Your Personal Finance Tracker')),
    ).toBeVisible();
  });

  it('should navigate to Login screen when "Login" button is pressed', async () => {
    await element(by.text('Login')).tap();
    await expect(element(by.id('login-btn'))).toBeVisible();
  });

  it('should navigate to Signup screen when "Sign Up" button is pressed', async () => {
    await element(by.text('Sign Up')).tap();
    await expect(element(by.id('signup-btn'))).toBeVisible();
  });
});
