import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerInputComponent} from './date-picker-input.component';
import {DlDateTimeDateModule, DlDateTimeInputModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    DlDateTimeDateModule,
    DlDateTimeInputModule,
    DlDateTimePickerModule,
    FormsModule,
  ],
  declarations: [
    DatePickerInputComponent,
  ],
})
export class DatePickerInputModule {
}
