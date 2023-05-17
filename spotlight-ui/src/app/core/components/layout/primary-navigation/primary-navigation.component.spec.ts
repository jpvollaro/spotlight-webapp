import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PrimaryNavigationComponent } from '@app/core/components/layout/primary-navigation/primary-navigation.component';

describe('PrimaryNavigationComponent', () => {
  let component: PrimaryNavigationComponent;
  let fixture: ComponentFixture<PrimaryNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryNavigationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
