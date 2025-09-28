import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async ({page}) => {
    const successMessage = page.locator('.bg-success')
    // const text = await successMessage.textContent()
    // await successMessage.waitFor({state: 'attached'})
    // const text = await successMessage.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('timeouts', async ({page}) => {
    // test.setTimeout(30000)
    test.slow()
    const successMessage = page.locator('.bg-success')
    await successMessage.click()
})