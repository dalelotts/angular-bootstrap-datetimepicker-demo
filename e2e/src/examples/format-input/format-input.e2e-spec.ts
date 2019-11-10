import {browser, logging} from 'protractor';

import {FormatInputPage} from './format-input.po';
import moment = require('moment');


describe('Format Input Example page', () => {
  let page: FormatInputPage;

  beforeEach(() => {
    page = new FormatInputPage();
    page.navigateTo();
    expect(browser.getCurrentUrl()).toMatch('.*/examples/format-input$');
  });

  it('entering ISO 8601 date as input updates entered dates and re-formats input', () => {
    const expectedDate = moment('2019-11-08T14:59:11.911Z');

    page.dateInput = '2019-11-08T14:59:11.911Z';
    page.getEnteredDate().click();

    expect(page.getEnteredDate().getText()).toBe(expectedDate.toDate().toString());
    expect(page.getDateInput().getAttribute('value')).not.toBe('2019-11-08T14:59:11.911Z');
    expect(page.getDateInput().getAttribute('value')).toBe(expectedDate.format('lll'));
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
