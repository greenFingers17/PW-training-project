import {Page, Locator} from '@playwright/test';
import { HelperBase } from './helperbase';

 export class NavigationPage extends HelperBase{
    readonly formLayoutsMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly tooltipMenuItem: Locator;
    readonly toasterMenuItem: Locator;

    constructor(page: Page) {
        super(page);
        this.formLayoutsMenuItem = page.getByTitle('Form Layouts');
        this.datePickerMenuItem = page.getByTitle('Datepicker');
        this.smartTableMenuItem = page.getByTitle('Smart Table');
        this.tooltipMenuItem = page.getByTitle('Tooltip');
        this.toasterMenuItem = page.getByTitle('Toastr');
        }

    async formLayoutsPage (){
        await this.selectGroupMenuItem('Forms');
        await this.formLayoutsMenuItem.click();
        await this.waitForNumberOfSeconds(2);
    }

    async datePickerPage (){
            await this.selectGroupMenuItem('Forms');
            await this.datePickerMenuItem.click()
    }

    async smartTablePage (){
        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenuItem.click()
    }

    async tooltipPage (){
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click()
    }

    async toasterPage (){
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.toasterMenuItem.click()
    }   

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded');
        if (isExpanded == 'false') {
            await groupMenuItem.click();
        }
    }


}