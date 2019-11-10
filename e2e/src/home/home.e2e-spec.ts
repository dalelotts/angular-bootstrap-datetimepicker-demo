import {browser, logging} from 'protractor';

import {HomePage} from './home.po';
import moment = require('moment');


describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
    expect(browser.getCurrentUrl()).toMatch('.*/$');
  });

  it('Has a dl-date-time-picker code block', () => {
    const code = page.getCode();
    expect(code).toContain('<dl-date-time-picker');
    expect(code).toContain('[(ngModel)]="selectedDate"');
    expect(code).toContain('</dl-date-time-picker>');
  });

  it('Max view: defaults to year', () => {
    const maxView = page.getMaxView().getAttribute('ng-reflect-model');
    expect(maxView).toBe('year');
    expect(page.getCode()).toContain('maxView="year"');
  });

  it('Changing Max view updates sample code', () => {
    page.maxView = 'day';
    const maxView = page.getMaxView().getAttribute('ng-reflect-model');
    expect(maxView).toBe('day');
    expect(page.getCode()).toContain('maxView="day"');
  });


  it('Min view: defaults to minute', () => {
    const minView = page.getMinView().getAttribute('ng-reflect-model');
    expect(minView).toBe('minute');
    expect(page.getCode()).toContain('minView="minute"');
  });

  it('Start view: defaults to day', () => {
    const startView = page.getStartView().getAttribute('ng-reflect-model');
    expect(startView).toBe('day');
    expect(page.getCode()).toContain('startView="day"');
  });

  it('Minute Step: defaults to 5', () => {
    const minuteStep = page.getMinuteStep().getAttribute('ng-reflect-model');
    expect(minuteStep).toBe('5');
    expect(page.getCode()).toContain('minuteStep="5"');
  });

  it('Picking time updates Selected Date:', async () => {
    const todayAtMidnight = moment('1990-12-19T21:32:17.800Z');
    const expectedDate = moment('1990-12-19T21:30:00.000Z');

    await page.pickTime(todayAtMidnight.valueOf());

    const selectedDate = page.getSelectedDate().getText();
    expect(selectedDate).toContain(expectedDate.toString());
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
