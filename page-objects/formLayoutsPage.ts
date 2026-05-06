import {Page, Locator} from '@playwright/test';
import { HelperBase } from './helperbase';

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }

    /**
     * This method fills the form in the 'Using the Grid' card with the provided email and password, selects the specified option, and submits the form.
     * @param email - valid email address to fill in the form
     * @param password - valid password to fill in the form
     * @param optionText - the text of the radio button option to select (e.g., 'Option 1', 'Option 2', etc.)
     */
    async submitUsingTheGridFormAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByLabel('Password').fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button', {name: 'Sign in'}).click()
        
    }

}