import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({page}) => {
    const successMessage = page.locator('.bg-success')
    // const text = await successMessage.textContent()
    // await successMessage.waitFor({state: 'attached'})
    // const text = await successMessage.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})