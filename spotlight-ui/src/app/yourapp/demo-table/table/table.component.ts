import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ITableInputModel } from '@uimf/uitk/components/tables';
import { DataService } from '@app/yourapp/demo-table/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  userModel: ITableInputModel = {
    title: 'Users',
    enableSorting: true,
    enableFiltering: true,
    caseSensitiveFilter: false,
    filterDelay: 1000,
    clearAllFilters: true,
    fixedHeader: true,
    pagination: {
      currentPageNumber: 1,
      recordsPerPage: 10
    },
    editRowConfig: {},
    exportConfig: {
      exportToExcel: true,
      saveAsFileName: 'test',
      exportToCsv: true
    },
    enableSingleRowSelect: true,
    enableCopyRow: true,
    copyRowDelimiter: ',',
    addRowConfig: {
      linkText: 'Add Row',
      saveButtonLabel: 'Save',
      cancelButtonLabel: 'Cancel'
    },
    showHideConfig: {
      linkText: 'Show/Hide Columns',
      saveButtonLabel: 'Save',
      cancelButtonLabel: 'Cancel'
    },
    printConfig: {
      font: 'Arial',
      fontSize: '10pt',
      gridHeaderStyle:
        'font-weight: bold; padding: 5px; border: 1px solid #dddddd; color: #1a0dab;',
      gridStyle:
        'border: 1px solid lightgray; margin-bottom: -1px; color: #609;',
      documentTitle: 'UITK - Dynamic Table - Single Select'
    },
    columns: [
      {
        label: 'Actions',
        printable: false,
        id: 'actions',
        dataType: 'text',
        enableEditAction: true,
        sortable: false,
        enableFiltering: false,
        showAlways: true
      },
      { label: 'ID', id: 'id', dataType: 'number' },
      { label: 'User Name', id: 'userName', dataType: 'text' },
      { label: 'Name', id: 'name', dataType: 'text' },
      { label: 'Email', id: 'email', dataType: 'text' }
    ],
    records: [],
    filteredRecords: []
  };

  public observable: Observable<any>;
  public observer: Observer<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.observable = new Observable(obj => {
      this.observer = obj;
      this.dataService.getAll().subscribe(users => {
        this.userModel.pagination.totalRecords = users.length;
        this.userModel.records = users;
        this.observer.next(this.userModel);
      });
    });
  }
}
