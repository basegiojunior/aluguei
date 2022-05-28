import { by, device, element, expect } from 'detox';

const mockEmail = 'example@example.com';
const mockNewEmail = 'example2@example.com';
const mockWrongEmail = 'wrong@wrong.com';
const mockPassword = '12345678';

describe('Auth', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should register a new user', async () => {
    await expect(element(by.id('navigate-to-register-button'))).toBeVisible();
    await element(by.id('navigate-to-register-button')).tap();
    await element(by.id('register-email-input')).typeText(mockNewEmail);
    await element(by.id('register-password-input')).typeText(mockPassword);
    await element(by.id('register-confirm-password-input')).typeText(
      mockPassword,
    );
    await element(by.id('register-button')).tap();
    await element(by.id('register-success-button')).tap();
    await expect(element(by.id('register-button'))).not.toExist();
  });

  it('should login and logout success', async () => {
    await expect(element(by.id('login-button'))).toBeVisible();
    await element(by.id('email-input')).typeText(mockEmail);
    await element(by.id('password-input')).typeText(mockPassword);
    await element(by.id('login-button')).tap();

    await expect(element(by.id('logout-button'))).toBeVisible();
    await element(by.id('logout-button')).tap();
    await expect(element(by.id('logout-button'))).not.toExist();
  });

  it('should resetPassword success', async () => {
    await expect(
      element(by.id('navigate-to-reset-password-button')),
    ).toBeVisible();
    await element(by.id('navigate-to-reset-password-button')).tap();
    await element(by.id('reset-password-email-input')).typeText(mockEmail);
    await element(by.id('reset-password-button')).tap();
    await element(by.id('reset-password-success-button')).tap();
    await expect(element(by.id('reset-password-button'))).not.toExist();
  });

  it('should show error login message', async () => {
    await expect(element(by.id('login-button'))).toBeVisible();
    await element(by.id('email-input')).typeText(mockWrongEmail);
    await element(by.id('password-input')).typeText(mockPassword);
    await element(by.id('login-button')).tap();
    await element(by.id('login-wrong-credentials-dialog-button')).tap();
    await expect(
      element(by.id('wrong-credentials-dialog-button')),
    ).not.toExist();
  });

  it('should show error register message', async () => {
    await expect(element(by.id('navigate-to-register-button'))).toBeVisible();
    await element(by.id('navigate-to-register-button')).tap();
    await element(by.id('register-email-input')).typeText(mockEmail);
    await element(by.id('register-password-input')).typeText(mockPassword);
    await element(by.id('register-confirm-password-input')).typeText(
      mockPassword,
    );
    await element(by.id('register-button')).tap();
    await element(by.id('register-email-in-use-error-ok-button')).tap();
    await expect(element(by.id('navigate-back-to-login'))).toBeVisible();
    await element(by.id('navigate-back-to-login')).tap();
    await expect(element(by.id('login-button'))).toBeVisible();
  });
});
