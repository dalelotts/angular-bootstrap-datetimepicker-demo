import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {DateButton, DlDateTimePickerChange} from 'angular-bootstrap-datetimepicker';
import * as _moment from 'moment';
import {unitOfTime} from 'moment';

let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}

declare var $: any;

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
})
export class DateRangeComponent implements AfterViewInit {

  disablePastDates = true;
  endDate: Date;
  minDuration = 0;
  startDate: Date;

  private _isStartPickerOpen = false;
  private _isEndPickerOpen = false;

  constructor(private _elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const startDatePickerParent = $('button.start-date[data-toggle="dropdown"]', this._elementRef.nativeElement).parent();
    startDatePickerParent.on('show.bs.dropdown', () => {
      this._isStartPickerOpen = true;
    });
    startDatePickerParent.on('hide.bs.dropdown', () => {
      this._isStartPickerOpen = false;
    });

    const endDatePickerParent = $('button.end-date[data-toggle="dropdown"]', this._elementRef.nativeElement).parent();
    endDatePickerParent.on('show.bs.dropdown', () => {
      this._isEndPickerOpen = true;
    });
    startDatePickerParent.on('hide.bs.dropdown', () => {
      this._isEndPickerOpen = false;
    });
  }


  /**
   * This filter `invalidate`s end dates that are entered via keyboard.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param value
   *  the numeric value of the date.
   */

  endDateInputFilter = (value: (number | null | undefined)) => {
    return this.endDatePickerFilter({value} as DateButton, 'minute');
  };


  /**
   * This filter `disables` end dates that are invalid for selection.
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

  endDatePickerFilter = (dateButton: DateButton, viewName: string) => {
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
   * This filter `invalidate`s start dates that are entered via keyboard.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param value
   *  the numeric value of the date.
   */

  startDateInputFilter = (value: (number | null | undefined)) => {
    return this.startDatePickerFilter({value} as DateButton, 'minute');
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

  startDatePickerFilter = (dateButton: DateButton, viewName: string) => {
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
    if (this._isEndPickerOpen && event.value) {
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
      if (this._isStartPickerOpen) {
        $('.start-date').dropdown('toggle');
      }
      if (this.endDate && this.endDate.getTime() < moment(event.value).add(this.minDuration, 'minute').valueOf()) {
        this.endDate = undefined;
      }
    }
  }
}
