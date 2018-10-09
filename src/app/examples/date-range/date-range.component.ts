import {Component} from '@angular/core';
import {DateButton, DlDateTimePickerChange} from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';
import {unitOfTime} from 'moment';

declare var $: any;

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
})
export class DateRangeComponent {

  disablePastDates = true;
  endDate: Date;
  minDuration = 0;
  startDate: Date;

  /**
   * This filter `disables` end dates that are invalid for selection.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `True`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param dateButton
   *  the target datebutton.
   *
   * @param viewName
   *  the current view.
   */

  endDateFilter = (dateButton: DateButton, viewName: string) => {
    // Truncate `now` to the start of the current view. i.e. 'day', etc.
    const now = moment().startOf(viewName as unitOfTime.StartOf).valueOf();

    // Start time might not be set at this time.
    // If not, use MIN_SAFE_INTEGER as the `default` start time.
    const startTime = (this.startDate
      ? moment(this.startDate).add(this.minDuration, 'minute').startOf(viewName as unitOfTime.StartOf).valueOf()
      : Number.MIN_SAFE_INTEGER);

    return this.disablePastDates
      ? dateButton.value >= now && dateButton.value >= startTime
      : dateButton.value >= startTime;
  };

  /**
   * This filter `disables` start dates that are invalid for selection.
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

  startDateFilter = (dateButton: DateButton, viewName: string) => {
    return this.disablePastDates
      ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  };

  /**
   * Close the End Date drop-down when endDate is selected.
   *
   * Do not `toggle` the drop-down unless a value is selected.
   *
   * ngModel handles actually setting the end date value.
   *
   * @param event
   *  the `DlDateTimePickerChange` event.
   */

  endDateSelected(event: DlDateTimePickerChange<Date>) {
    if (event.value) {
      $('.end-date').dropdown('toggle');
    }
  }

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
   * Close the Start Date drop-down when startDate is selected.
   *
   * Do not `toggle` the drop-down unless a value is selected.
   *
   * ngModel handles actually setting the start date value.
   *
   * @param event
   *  the `DlDateTimePickerChange` event.
   */

  startDateSelected(event) {
    if (event.value) {
      $('.start-date').dropdown('toggle');
      if (this.endDate && this.endDate.getTime() < moment(event.value).add(this.minDuration, 'minute').valueOf()) {
        this.endDate = undefined;
      }
    }
  }
}
