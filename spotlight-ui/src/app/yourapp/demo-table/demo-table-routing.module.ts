import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { TableComponent } from '@app/yourapp/demo-table/table/table.component';

const routes: Routes = [
  { path: '', component: TableComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoTableRoutingModule { }
