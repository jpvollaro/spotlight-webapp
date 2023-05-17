import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DrawerExampleComponent } from '@app/yourapp/examples/drawer/drawer.example.component';

describe('DrawerComponent', () => {
  let component: DrawerExampleComponent;
  let fixture: ComponentFixture<DrawerExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerExampleComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleLeftDrawer', () => {
    it('should set leftHandDrawer', () => {
      component.leftHandDrawer = false;
      component.toggleLeftDrawer();
      expect(component.leftHandDrawer).toBeTruthy();
    });
  });

  describe('toggleRightDrawer', () => {
    it('should set rightHandDrawer', () => {
      component.rightHandDrawer = false;
      component.toggleRightDrawer();
      expect(component.rightHandDrawer).toBeTruthy();
    });
  });
});
