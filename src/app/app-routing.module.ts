import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DateRangeComponent} from './examples/date-range/date-range.component';
import {DateRangeModule} from './examples/date-range/date-range.module';
import {FormatInputComponent} from './examples/format-input/format-input.component';
import {DatePickerInputComponent} from './examples/date-picker-input/date-picker-input.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'examples', redirectTo: 'examples/date-range', pathMatch: 'full'},
  {path: 'examples/date-picker-input', component: DatePickerInputComponent},
  {path: 'examples/date-range', component: DateRangeComponent},
  {path: 'examples/format-input', component: FormatInputComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DateRangeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
