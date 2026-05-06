import {Page, Locator, expect} from '@playwright/test';
import { HelperBase } from './helperbase';

export class DatePickerPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }

    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number){
            const calendarInputField = this.page.getByPlaceholder('Form Picker')
            await calendarInputField.click()
            const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
            await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerRangeFromTodasy(startDateFromToday: number, endDateFromToday: number){
            const calendarInputField = this.page.getByPlaceholder('Range Picker')
            await calendarInputField.click()
            const startDateToAssert = await this.selectDateInTheCalendar(startDateFromToday)
            const endDateToAssert = await this.selectDateInTheCalendar(endDateFromToday)
            const dateRangeToAssert = `${startDateToAssert} - ${endDateToAssert}`
            await expect(calendarInputField).toHaveValue(dateRangeToAssert)
    }


    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
            date.setDate(date.getDate() + numberOfDaysFromToday)
            const expectedDate = date.getDate().toString()
            const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
            const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
            const expectedYear = date.getFullYear()
            const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        
            let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
            const calendarNextButton = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
            while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
                await calendarNextButton.click()
                calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            }
        
            await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
            return dateToAssert
    }}