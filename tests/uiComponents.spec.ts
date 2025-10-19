import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByTitle('Form Layouts').click()
    })

    test('input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 300})

        // generic assertion
        const inputEmailValue = await usingTheGridEmailInput.inputValue()
        expect(inputEmailValue).toEqual('test2@test.com')

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

    })

    test('radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByLabel('Option 1')).not.toBeChecked()
        await expect(usingTheGridForm.getByLabel('Option 2')).toBeChecked()

    })

    test.describe('Modal & Overlays page', () => {
        test.beforeEach(async ({page}) => {
            await page.getByTitle('Modal & Overlays').click()
            await page.getByTitle('Toastr').click()
        })

        test('checkboxes', async ({page}) => {
            await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
            await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

            const allBoxes = page.getByRole('checkbox')

            for (const box of await allBoxes.all()){
                await box.uncheck({force: true})
                expect(await box.isChecked()).toBeFalsy()
            }
            

        })

        test('lists and dropdowns', async ({page}) => {
            const dropdownMenu = page.locator('nav nb-select')
            await dropdownMenu.click()

            page.getByRole('list')  // used for ul tag
            page.getByRole('listitem')  // used for li tag

            const optionList = page.locator('nb-option-list nb-option')
            await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
            await optionList.filter({hasText: 'Cosmic'}).click()

            const header = page.locator('nb-layout-header')
            await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
            
            // select all items from the frop-down  and validate the colors
            const colors = {
                'Light': 'rgb(255, 255, 255)',
                'Dark': 'rgb(34, 43, 69)',
                'Cosmic': 'rgb(50, 50, 89)',
                'Corporate': 'rgb(255, 255, 255)'
            }
            await dropdownMenu.click()
            for (const color in colors){
                await optionList.filter({hasText: color}).click()
                await expect(header).toHaveCSS('background-color', colors[color])
                if (color != 'Corporate'){
                    await dropdownMenu.click()
                }
            }
            
        })

    })

})

test('tooltips', async ({page}) => {
    await page.getByTitle('Modal & Overlays').click()
    await page.getByTitle('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()
    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')

})

test('dialog box', async ({page}) => {
    await page.getByTitle('Tables & Data').click()
    await page.getByTitle('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.locator('tbody tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()

    expect(page.locator('table tr').first()).not.toContainText('mdo@gmail.com')

})

test('web tables', async({page}) => {
    await page.getByTitle('Tables & Data').click()
    await page.getByTitle('Smart Table').click()

    // 1 - get the row by any text in this row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('29')
    await targetRow.locator('.nb-checkmark').click()

    // 2 - get the row by the value in the specific column
    await page.locator('ul.ng2-smart-pagination').getByText('2').click()
    const targetRowByID = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test88@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowByID.locator('td').nth(5)).toHaveText('test88@test.com')

    // 3 - test filter of the table
    const ages = ['20', '30', '40', '200']
    for (let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        for (let row of await ageRows.all()){
            const sellValue = await row.locator('td').last().textContent()
            if (age == '200'){
                expect(sellValue).toEqual(' No data found ')
            } else (
                expect(sellValue).toEqual(age)
            )
        }

    }

}) 

test('datepicker', async ({page}) =>{
    await page.getByTitle('Forms').click()
    await page.getByTitle('Datepicker').click()
    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField). toHaveValue('Oct 1, 2025')
})