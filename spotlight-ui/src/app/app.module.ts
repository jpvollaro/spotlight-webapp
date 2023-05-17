import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgIdleModule } from '@ng-idle/core';

import { JoyrideModule } from 'ngx-joyride';
import { HeaderModule } from '@uimf/uitk/components/header';
import { FooterModule } from '@uimf/uitk/components/footer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@app/core/core.module';
import { NavigationModule } from '@uimf/uitk/components/navigation';
import { BreadcrumbModule } from '@uimf/uitk/components/breadcrumb';
import { FeatureToggleModule } from '@app/feature-toggle/feature-toggle.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    NavigationModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    NgIdleModule.forRoot(),
    CoreModule,
    JoyrideModule.forRoot(),
    BreadcrumbModule,
    FeatureToggleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
