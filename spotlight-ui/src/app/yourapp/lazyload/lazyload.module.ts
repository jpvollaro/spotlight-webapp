import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyloadRoutingModule } from '@app/yourapp/lazyload/lazyload-routing.module';
import { LazyloadComponent } from '@app/yourapp/lazyload/lazyload.component';


@NgModule({
  imports: [
    CommonModule,
    LazyloadRoutingModule
  ],
  declarations: [LazyloadComponent]
})
export class LazyloadModule { }
