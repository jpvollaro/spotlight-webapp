import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from '@app/yourapp/movies/movies-routing.module';
import { MoviesComponent } from '@app/yourapp/movies/movies.component';
import { TableModule } from '@uimf/uitk/components/tables';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TableModule,
    FormsModule
  ],
  declarations: [MoviesComponent]
})
export class MoviesModule { }
