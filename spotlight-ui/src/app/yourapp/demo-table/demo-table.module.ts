import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TableModule } from '@uimf/uitk/components/tables';
import { PageLoadingIndicatorModule } from '@uimf/uitk/components/page-loading-indicator';
import { DemoTableRoutingModule } from '@app/yourapp/demo-table/demo-table-routing.module';
import { TableComponent } from '@app/yourapp/demo-table/table/table.component';
import { DataService } from '@app/yourapp/demo-table/services/data.service';

@NgModule({
  imports: [
    CommonModule,
    DemoTableRoutingModule,
    TableModule,
    FormsModule,
    PageLoadingIndicatorModule
  ],
  declarations: [TableComponent],
  providers: [DataService]
})
export class DemoTableModule {}
