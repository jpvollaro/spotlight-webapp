import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from '@uimf/uitk/components/card';
import { ButtonModule } from '@uimf/uitk/components/button';
import { TextFieldModule } from '@uimf/uitk/components/text-field';
import { IconFontModule } from '@uimf/uitk/components/icon-font';
import { PanelModule } from '@uimf/uitk/components/panel';
import { MessageModule } from '@uimf/uitk/components/message';

import { AuthService } from '@app/core/services/auth.service';
import { TokenService } from '@app/core/services/token.service';
import { NotificationService } from '@app/core/services/notification.service';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@app/core/middlewares/token.interceptor';
import { LocationService } from '@app/core/services/location.service';

import { LoginComponent } from '@app/core/components/account/login/login.component';
import { LogoutComponent } from '@app/core/components/account/logout/logout.component';
import { NotificationComponent } from '@app/core/components/notification/notification.component';
import { UnauthorizedComponent } from '@app/core/components/account/unauthorized/unauthorized.component';
import { VerticalNavigationComponent } from '@app/core/components/layout/vertical-navigation/vertical-navigation.component';
import { PrimaryNavigationComponent } from '@app/core/components/layout/primary-navigation/primary-navigation.component';
import { NavigationModule } from '@uimf/uitk/components/navigation';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    NotificationComponent,
    UnauthorizedComponent,
    VerticalNavigationComponent,
    PrimaryNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    TextFieldModule,
    IconFontModule,
    PanelModule,
    MessageModule,
    NavigationModule
  ],
  providers: [
    AuthService,
    TokenService,
    NotificationService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    LocationService
  ],
  exports: [
    VerticalNavigationComponent,
    PrimaryNavigationComponent,
    NotificationComponent
  ]
})
export class CoreModule {}
