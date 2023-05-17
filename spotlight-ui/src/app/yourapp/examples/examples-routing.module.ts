import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { DrawerExampleComponent } from '@app/yourapp/examples/drawer/drawer.example.component';

const routes: Routes = [
  { path: 'drawer', component: DrawerExampleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
