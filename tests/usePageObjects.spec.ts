import {test} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';


test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://localhost:4200/')
})

test ('Navigate to Form page', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().tooltipPage();
    await pm.navigateTo().toasterPage();

})

test ('Parametrized test', async ({page}) =>{
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormAndSelectOption('test@test.com', 'password123', 'Option 1');
    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectCommonDatepickerDateFromToday(5);
    await pm.onDatePickerPage().selectDatepickerRangeFromTodasy(5, 10);
})