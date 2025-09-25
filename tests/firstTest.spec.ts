import {expect, test} from '@playwright/test';

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
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailFieldBasicForm = basicForm.getByRole('textbox', {name: 'Email'})
    await emailFieldBasicForm.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailFieldBasicForm).toHaveValue('test@test.com')
})

test('extracting values', async ({page}) => {
    // validate that the button text on the Basic form is Submit
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicForm.locator('button').textContent()
    console.log(`button text is: ${buttonText}`)
    expect(buttonText).toEqual('Submit')
    // await expect(basicForm.getByRole('button')).toHaveText('Submit')

    // get all radio buttons and validate that at least one of them has the text Option 1
    const radioButtons = await page.locator('nb-radio').allTextContents()
    console.log(radioButtons)
    expect(radioButtons).toContain('Option 1')

    // input value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // validate the value of the html attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

    // general assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // soft assertion - test will continue even if this fails. Not the best practice
    await expect.soft(basicFormButton).toHaveText('Submit123')
    await basicFormButton.click()
    
})