import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Locators', async ({page}) => {
    // by tag name
    page.locator('input')

    // by id
    page.locator('#inputEmail1')

    // by class name
    page.locator('.input-full-width')

    // by attribute name
    page.locator('[placeholder]')

    // by attribute name and value
    page.locator('[placeholder="Email"]')

    // by multiple attributes
    page.locator('[placeholder="Email"][type="email"]')
    
    // by tag name and attribute with value
    page.locator('input[placeholder="Email"]')

    // by two different attributes
    page.locator('input[placeholder="Email"][type="email"]')

    // by text
    page.locator('text=Email')

    // by text (using regular expressions)
    page.locator('text=/^Email$/')

    // by partial text match
    page.locator(':text"Using"')

    // by exact text
    page.locator(':text-is("Using the Grid")')

    // by combination of locators
    page.locator('input[placeholder="Email"]#inputEmail1.input-full-width')

    // by parent to child
    page.locator('form input')

    // by child to parent
    page.locator('form >> input')

    // by nth element
    page.locator('input').nth(0)

    // by first element
    page.locator('input').first()

    // by last element
    page.locator('input').last()

    // by text content
    page.locator('nb-card:has-text("Using the Grid")')

    // by class value (full)
    page.locator('[class="ng-tns-c140-2 ng-star-inserted"]')

    // by XPath (not recommended)
    page.locator('//input[@id="inputEmail1"]')
    page.locator('//@id="inputEmail1"')

})

test('User facing locators', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByTitle('Form Layouts').click()
    await page.getByRole('textbox', { name: 'Email'}).nth(2).fill('Itest')
    await page.getByLabel('Email').first().fill('Itest')
})