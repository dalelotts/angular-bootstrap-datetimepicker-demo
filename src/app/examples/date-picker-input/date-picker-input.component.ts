import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {DateButton} from 'angular-bootstrap-datetimepicker';
import * as _moment from 'moment';
import {unitOfTime} from 'moment';

let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}

declare var $: any;

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
})
export class DatePickerInputComponent implements AfterViewInit {
  disablePastDates = true;
  enteredDate: Date;
  private _isPickerOpen = false;

  constructor(private _elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const dropdownToggle = $('[data-toggle="dropdown"]', this._elementRef.nativeElement);
    dropdownToggle.parent().on('show.bs.dropdown', () => {
      this._isPickerOpen = true;
    });
    dropdownToggle.parent().on('hide.bs.dropdown', () => {
      this._isPickerOpen = false;
    });
  }


  /**
   * This filter `disables` dates that are invalid for selection.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param value
   *  the numeric value of the user entered date.
   */

  dateInputFilter = (value: (number | null)) => {
    return this.disablePastDates
      ? value >= moment().valueOf()
      : true;
  }

  /**
   * This filter `disables` dates that are invalid for selection.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param dateButton
   *  the target datebutton.
   *
   * @param viewName
   *  the current view.
   */

  datePickerFilter = (dateButton: DateButton, viewName: string) => {
    return this.disablePastDates
      ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  };

  /**
   * Used to keep the Bootstrap drop-down open while clicking on the date/time picker.
   *
   * Without this, the dropdown will close whenever the user clicks,
   * @param event
   *  the DOM click event.
   */

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }

  /**
   * Close the Date drop-down when date is selected.
   *
   * Do not `toggle` the drop-down unless a value is selected.
   *
   * ngModel handles actually setting the start date value.
   *
   * @param event
   *  the `DlDateTimePickerChange` event.
   */

  dateSelected(event) {
    console.log('_isDropdownVisible', this._isPickerOpen);
    if (this._isPickerOpen && event.value) {
      $('.date-dropdown').dropdown('toggle');
    }
  }
}
