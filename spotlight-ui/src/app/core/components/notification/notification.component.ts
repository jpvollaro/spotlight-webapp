import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '@app/core/services/notification.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  common = {
    position: environment.notification.position,
    messageRole: environment.notification.messageRole,
    closeButton: environment.notification.closeButton,
    animationType: environment.notification.animationType,
    autoClose: environment.notification.autoClose,
    messageVisibleTime: +environment.notification.messageVisibleTime,
    animationTime: environment.notification.animationTime
  };

  success = {
    visible: false,
    messageType: 'success'
  };

  info = {
    visible: false,
    messageType: 'info'
  };

  warning = {
    visible: false,
    messageType: 'warning'
  };

  error = {
    visible: false,
    messageType: 'error'
  };

  notificationContent = {
    summary: '',
    detail: ''
  };

  constructor(
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.notificationService.listen().subscribe(alert => {
      this.notificationContent.summary = alert.summary;
      this.formatDetail(alert.detail);
      switch (alert.severity) {
        case 'success':
          this.success.visible = true;
          break;
        case 'info':
          this.info.visible = true;
          setTimeout(
            () => (this.info.visible = false),
            this.common.messageVisibleTime
          );
          break;
        case 'warning':
          this.warning.visible = true;
          setTimeout(
            () => (this.warning.visible = false),
            this.common.messageVisibleTime
          );
          break;
        case 'error':
          this.error.visible = true;
          setTimeout(
            () => (this.error.visible = false),
            this.common.messageVisibleTime
          );
          break;
      }
    });
  }

  formatDetail(content: string[]) {
    let message = '';
    content.forEach(element => {
      message += element + '<br />';
    });

    this.notificationContent.detail = message;
  }
}
