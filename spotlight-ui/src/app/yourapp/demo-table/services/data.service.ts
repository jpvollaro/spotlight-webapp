import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chance } from 'chance';
import { IfilterCriteria } from '@uimf/uitk/components/tables';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/yourapp/demo-table/models/user';

@Injectable()
export class DataService {
  users: User[];
  chance: any = new Chance();

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
