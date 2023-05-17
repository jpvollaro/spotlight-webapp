import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ITableInputModel } from "@uimf/uitk/components/tables"; 

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  columns: any = [ 
    { label: 'Movie Name', id: 'name', dataType: 'text' }, 
    { label: 'Description', id: 'description', dataType: 'text' }, 
    { label: 'Year', id: 'year', dataType: 'number' }, 
    { label: 'Genre', id: 'genre', dataType: 'text' }, 
    { label: 'Rating', id: 'rating', dataType: 'number' },     
  ]; 

  public modelFour: ITableInputModel = { 
    title: 'Movie Table', 
    enableSorting: true, 
    enableFiltering: true, 
    clearAllFilters: true, 
    caseSensitiveFilter: false, 
    fixedHeader: true, 
    filterCondition: { 
      columnSorting: { 
        columnId: 'name', 
        sortOrder: 1, 
      }, 
    }, 
    pagination: { 
      currentPageNumber: 1, 
      recordsPerPage: 10, 
      recordsPerPageOptions: [1, 5, 8, 10 ], 
    },     
  }; 
 
  records; 
  starRatings: Array<string> = [
    'assets/images/star0.JPG', 
    'assets/images/star1.JPG',   
    'assets/images/star2.JPG', 
    'assets/images/star3.JPG', 
    'assets/images/star4.JPG',
    'assets/images/star5.JPG'];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
     (data)=>{
        console.log(data);
        this.records = data['movies'];
      },
      error => {
        console.log(error);
    });
  }
}