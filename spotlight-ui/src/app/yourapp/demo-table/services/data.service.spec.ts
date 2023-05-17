import { TestBed, inject } from '@angular/core/testing';

import { DataService } from '@app/yourapp/demo-table/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAll', () => {
    it('should return values', inject([DataService], (service: DataService) => {
      service.getAll().subscribe(response => {
        expect(response.length).toEqual(100);
      });
    }));
  });
});
