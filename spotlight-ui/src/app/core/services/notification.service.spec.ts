import { TestBed, inject } from '@angular/core/testing';
import { NotificationService } from '@app/core/services/notification.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });

    const summary = 'summary text';
    const detail = 'detail text';
  });

  it('should create', inject(
    [NotificationService],
    (service: NotificationService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('+ should call showInfo()', inject(
    [NotificationService],
    (service: NotificationService) => {
      spyOn(service, 'showInfo').and.callThrough();
      service.showInfo(this.summary, this.detail);
      expect(service.showInfo).toHaveBeenCalled();
    }
  ));

  it('+ should call showWarning()', inject(
    [NotificationService],
    (service: NotificationService) => {
      spyOn(service, 'showWarning').and.callThrough();
      service.showWarning(this.summary, this.detail);
      expect(service.showWarning).toHaveBeenCalled();
    }
  ));

  it('+ should call listen()', inject(
    [NotificationService],
    (service: NotificationService) => {
      spyOn(service, 'listen').and.callThrough();
      service.listen();
      expect(service.listen).toHaveBeenCalled();
    }
  ));
});
