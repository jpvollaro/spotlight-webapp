import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { JoyrideService } from 'ngx-joyride';
import { JoyrideComponent } from '@app/yourapp/joyride/joyride.component';

describe('JoyrideComponent', () => {
  let component: JoyrideComponent;
  let fixture: ComponentFixture<JoyrideComponent>;

  class JoyrideServiceMock {
    startTour(config: any) {
      return of({});
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyrideComponent ],
      providers: [
        { provide: JoyrideService, useClass: JoyrideServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
