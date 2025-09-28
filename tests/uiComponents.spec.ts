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
            const dropdownMenu = page.getByRole('button', {name: 'Light'})
            await dropdownMenu.click()

            page.getByRole('list')  // used for ul tag
            page.getByRole('listitem')  // used for li tag

            const optionList = page.locator('nb-option-list nb-option')

            
        })
    })
 


})