// only works on ios emulators, android has some issues with tapping on the custom picker

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

    await element(by.id('email-login')).typeText('test@example.com');
    await element(by.id('password-login')).typeText('testpassword');

    await element(by.id('login-btn')).tap();
  });

  it('should add a new expense transaction', async () => {
    await expect(element(by.text('Financial Overview'))).toBeVisible();

    await element(by.id('transaction-btn')).tap();

    await element(by.id('title-input')).typeText('Asda');
    await element(by.id('amount-input')).typeText('50');
    await element(by.text('Others')).tap();
    await element(by.text('Groceries')).tap();
    await element(by.text('Submit')).tap();

    await expect(element(by.id('current-balance'))).toHaveText('$-50.00');
  });

  it('should add a new income transaction', async () => {
    await expect(element(by.text('Financial Overview'))).toBeVisible();

    await element(by.id('transaction-btn')).tap();

    await element(by.id('title-input')).typeText('Salary');
    await element(by.id('amount-input')).typeText('1000');
    await element(by.text('Expense')).tap();
    await element(by.text('Income')).tap();
    await element(by.text('Submit')).tap();

    await expect(element(by.id('current-balance'))).toHaveText('$1000.00');
  });

  it('should both income and expense transactions', async () => {
    await expect(element(by.text('Financial Overview'))).toBeVisible();

    await element(by.id('transaction-btn')).tap();

    await element(by.id('title-input')).typeText('Gift');
    await element(by.id('amount-input')).typeText('500');
    await element(by.text('Expense')).tap();
    await element(by.text('Income')).tap();
    await element(by.text('Others')).tap();
    await element(by.id('category-picker')).scroll(370, 'down');
    await element(by.text('Gifts & Donations')).tap();
    await element(by.text('Submit')).tap();

    await element(by.id('transaction-btn')).tap();

    await element(by.id('title-input')).typeText('new headphones');
    await element(by.id('amount-input')).typeText('80');
    await element(by.text('Others')).tap();
    await element(by.id('category-picker')).scroll(250, 'down');
    await element(by.text('Electronics')).tap();
    await element(by.text('Submit')).tap();

    await expect(element(by.id('current-balance'))).toHaveText('$420.00');

    await element(by.id('home-scroll')).scroll(850, 'down');

    await expect(element(by.text('$80.00 for new headphones'))).toBeVisible();

    await expect(element(by.text('$500.00 for Gift'))).toBeVisible();

    await element(by.id('home-scroll')).scroll(850, 'down');

    await expect(element(by.text('Electronics'))).toBeVisible();
  });
});
