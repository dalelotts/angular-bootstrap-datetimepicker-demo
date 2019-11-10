import {browser, by, element} from 'protractor';
import pickTime from '../dl-date-time-picker-protractor';

export class HomePage {

  set maxView(value: string) {
    this.getMaxView().click();
    this.getMaxView().element(by.css(`option[value=${value}]`)).click();
  }

  navigateTo() {
    return browser.get(browser.baseUrl + '/') as Promise<any>;
  }

  getMaxView() {
    return element(by.id('maxView'));
  }

  getMinView() {
    return element(by.id('minView'));
  }

  getStartView() {
    return element(by.id('startView'));
  }

  getMinuteStep() {
    return element(by.id('minuteStep'));
  }

  getCode() {
    return element(by.id('exampleCode')).getText();
  }

  pickTime(time: number) {
    return pickTime(this.getPicker(), time);
  }

  getSelectedDate() {
    return element(by.id('selectedDate'));
  }

  getPicker() {
    return element(by.tagName('dl-date-time-picker'));
  }
}
