import {browser, by, element, ElementFinder} from 'protractor';

export class FormatInputPage {


  set dateInput(input: string) {
    this.getDateInput().sendKeys(input);
  }

  getDateInput(): ElementFinder {
    return element(by.id('dateInput'));
  }

  navigateTo() {
    return browser.get(browser.baseUrl + '/examples/format-input') as Promise<any>;
  }

  getEnteredDate(): ElementFinder {
    return element(by.id('enteredDate'));
  }
}
