import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoyrideComponent } from '@app/yourapp/joyride/joyride.component';

const routes: Routes = [
  {
    path: '', component : JoyrideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoyrideRoutingModule { }
