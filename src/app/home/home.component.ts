import {Component} from '@angular/core';
import {DlDateTimePickerChange} from 'angular-bootstrap-datetimepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  maxView = 'year';
  minuteStep = 5;
  minView = 'minute';
  selectedDate: Date;
  showCalendar = true;
  startView = 'day';
  views = ['minute', 'hour', 'day', 'month', 'year'];

  /**
   * Sample implementation of a `change` event handler.
   * @param event
   *  The change event.
   */

  onCustomDateChange(event: DlDateTimePickerChange<Date>) {
    console.log(event.value);
  }

  /**
   * Determines whether or not the specified `minView` option is disabled (valid)
   * considering the current `startView` and `maxView` settings.
   * @param view
   * the target view value.
   */

  isMinViewDisabled(view) {
    return this.views.indexOf(view) > this.views.indexOf(this.startView)
      || this.views.indexOf(view) > this.views.indexOf(this.maxView);
  }

  /**
   * Determines whether or not the specified `maxView` option is disabled (valid)
   * considering the current `startView` and `minView` settings.
   * @param view
   * the target view value.
   */

  isMaxViewDisabled(view) {
    return this.views.indexOf(view) < this.views.indexOf(this.startView)
      || this.views.indexOf(view) < this.views.indexOf(this.minView);
  }

  /**
   * Determines whether or not the specified `startView` option is disabled (valid)
   * considering the current `minView` and `maxView` settings.
   * @param view
   * the target view value.
   */

  isStartViewDisabled(view) {
    return this.views.indexOf(this.minView) > this.views.indexOf(view)
      || this.views.indexOf(this.maxView) < this.views.indexOf(view);
  }

  /**
   * Removes/Adds the picker from the DOM forcing a re-render when
   * the `starView` value changes.
   */

  refresh() {
    this.showCalendar = false;
    setTimeout(() => this.showCalendar = true, 100);
  }
}
