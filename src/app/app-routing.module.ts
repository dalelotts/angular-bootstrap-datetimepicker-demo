import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DateRangeComponent} from './examples/date-range/date-range.component';
import {DateRangeModule} from './examples/date-range/date-range.module';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'examples', redirectTo: 'examples/date-range',  pathMatch: 'full'},
  {path: 'examples/date-range', component: DateRangeComponent},
  // {path: 'examples/format-input-box', component: FormatInputBoxComponent},
  // {path: 'examples/date-in-model', component: JavaScriptDateModelComponent},
  // {path: 'examples/moment-in-model', component: MomentModelComponent},
  // {path: 'examples/number-in-model', component: NumberModelComponent},
  // {path: 'examples/string-in-model', component: StringModelComponent},
  // {path: 'examples/custom-model-provider', component: CustomModelProviderComponent},
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
