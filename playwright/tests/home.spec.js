// Basic smoke tests for TeamSkill Demo application
import { test, expect } from '@playwright/test';

test.describe('TeamSkill Demo Home Page', () => {
  test('should display welcome message', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads successfully
    await expect(page).toHaveTitle(/TeamSkill Demo/);
    
    // Verify welcome message is displayed
    await expect(page.locator('h2')).toContainText('Welcome to the TeamSkill Demo Application');
    
    // Check that the description is present
    await expect(page.locator('.description')).toContainText('secure platform for team skillset management');
    
    // Verify status card shows development status
    await expect(page.locator('.status-badge')).toContainText('Development');
    
    // Check that planned features are listed
    await expect(page.locator('.features-preview')).toContainText('Microsoft Entra ID Authentication');
  });

  test('should have working health check endpoint', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.status).toBe('healthy');
    expect(data.service).toBe('teamskill-demo');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that the page still loads properly on mobile
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('.description')).toBeVisible();
  });
});