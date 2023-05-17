import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableComponent } from '@app/yourapp/demo-table/table/table.component';
import { User } from '@app/yourapp/demo-table/models/user';
import { DataService } from '@app/yourapp/demo-table/services/data.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  class MockDataService {
    getAll(): Observable<User[]> {
      return null;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: DataService, useClass: MockDataService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const mockResponse = [
      { id: 1, userName: 'test1' },
      { id: 2, userName: 'test2' },
      { id: 3, userName: 'test3' }
    ];
    const dataService = TestBed.get(DataService);
    const dataSpy = spyOn(dataService, 'getAll').and.returnValue(
      of(mockResponse)
    );
    component.observable.subscribe(() => {
      expect(component.userModel.records.length).toEqual(3);
    });
  });
});
