import {test} from '@playwright/test';

// test.describe('test suite 1', () => {
//     test('the first test', () => {

//     })

//     test('the second test', () => {
    
//     })

//     test('the third test', () => {
    
//     })
// })


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByTitle('Form Layouts').click()
})

test.describe('test suite 1', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
    })

    test('the 1st test', async ({page}) => {
        await page.getByTitle('Form Layouts').click()
    })

    test ('navigate to datepicker page', async ({page}) => {
    await page.getByTitle('Datepicker').first().click()
    })
    
})

test.describe('test suite 2', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Charts').first().click()
    })

    test ('navigate to Echarts page', async ({page}) => {
    await page.getByTitle('Echarts').click()
    })
    
})

test('locating child elements', async ({page}) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    // less preferable because the order of elements might change
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {

    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
        .getByRole('textbox', {name: 'Email'}).click()

    // using XPath - ('..') goes one level up to the paent element
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()

}) 

test('Reusing locators', async ({page}) => {
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).fill('test@test.com')
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Password'}).fill('Welcome123')
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('button').click()
})