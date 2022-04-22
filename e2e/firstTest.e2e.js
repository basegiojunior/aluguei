import { by, device, element, expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login and logout', async () => {
    await expect(element(by.id('login-button'))).toBeVisible();
    await element(by.id('email-input')).typeText('example@example.com');
    await element(by.id('password-input')).typeText('123456');
    await element(by.id('login-button')).tap();

    await expect(element(by.id('logout-button'))).toBeVisible();
    await element(by.id('logout-button')).tap();
    await expect(element(by.id('logout-button'))).not.toExist();
  });
});
