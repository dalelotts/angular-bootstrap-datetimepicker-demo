import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {DateRangeModule} from './examples/date-range/date-range.module';
import {HomeModule} from './home/home.module';
import {FormatInputModule} from './examples/format-input/format-input.module';
import {DatePickerInputModule} from './examples/date-picker-input/date-picker-input.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HomeModule,
    DateRangeModule,
    DatePickerInputModule,
    FormatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
