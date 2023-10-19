import { test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?args=&id=select-header-step--basic&viewMode=story');

  await page.getByRole('row', ).filter({ hasText: 'second' }).click();
});
