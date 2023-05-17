import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModule } from '@uimf/uitk';
import { NotificationService } from '@app/core/services/notification.service';
import { NotificationComponent } from '@app/core/components/notification/notification.component';

describe('AlertComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [MessageModule],
      providers: [NotificationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
