import {Component, Inject} from '@angular/core';
import * as _moment from 'moment';
import {DL_DATE_TIME_DISPLAY_FORMAT, DL_DATE_TIME_INPUT_FORMATS} from 'angular-bootstrap-datetimepicker';

let moment = _moment;
/* istanbul ignore if */
if ('default' in _moment) {
  moment = _moment['default'];
}

@Component({
  selector: 'app-format-input',
  templateUrl: './format-input.component.html',
})
export class FormatInputComponent {
  inputFormats: string[];
  enteredDate: Date;
  placeHolder = moment.localeData().longDateFormat('lll');
  displayFormat: string;

  constructor(@Inject(DL_DATE_TIME_INPUT_FORMATS) inputFormats: string[],
              @Inject(DL_DATE_TIME_DISPLAY_FORMAT) displayFormat: string) {
    this.inputFormats = inputFormats.filter(format => typeof format !== 'function');
    this.displayFormat = displayFormat;
  }

}
