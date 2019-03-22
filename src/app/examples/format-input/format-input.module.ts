import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormatInputComponent} from './format-input.component';
import {DlDateTimeDateModule, DlDateTimeInputModule} from 'angular-bootstrap-datetimepicker';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DlDateTimeDateModule,
    DlDateTimeInputModule
  ],
  declarations: [
    FormatInputComponent,
  ],
})
export class FormatInputModule {

}
