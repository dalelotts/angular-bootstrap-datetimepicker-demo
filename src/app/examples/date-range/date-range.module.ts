import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateRangeComponent} from './date-range.component';
import {DlDateTimePickerDateModule} from 'angular-bootstrap-datetimepicker';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DlDateTimePickerDateModule
  ],
  declarations: [
    DateRangeComponent,
  ],
})
export class DateRangeModule {
}
