import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lazyload',
    loadChildren: 'app/yourapp/lazyload/lazyload.module#LazyloadModule'
  },
  {
    path: 'movies',
    loadChildren: 'app/yourapp/movies/movies.module#MoviesModule'
  },
  {
    path: 'weather',
    loadChildren: 'app/yourapp/weather/weather.module#WeatherModule'
  },
  {
    path: 'joyride',
    loadChildren: 'app/yourapp/joyride/joyride.module#JoyrideSampleModule'
  },
  {
    path: 'datatable',
    loadChildren: 'app/yourapp/demo-table/demo-table.module#DemoTableModule'
  },
  {
    path: 'examples',
    loadChildren: 'app/yourapp/examples/examples.module#ExamplesModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourappRoutingModule {}
