import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { globalNavModel } from '@app/core/models/global.navigation';
import { primaryNavModel } from '@app/core/models/primary.navigation';
import { sideNavModel } from '@app/core/models/side.navigation';
import { AuthService } from '@app/core/services/auth.service';
import { environment } from '@env/environment';

import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { NullValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '@app/core/models/auth.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public primaryNavModel: any;
  public globalNavModel: any = globalNavModel.loggedOut;
  public sideNavModel: any;
  hideWhenLoggedOut = sideNavModel.hideWhenLoggedOut;
  user: any;
  navigationMode: string;
  loggedIn = false;
  showTopNav = false;
  showSideNav = false;
  public applicationName: string;
  idleState: string;

  ngOnInit(): void {
    this.navigationMode = environment.navigationMode;
    this.applicationName = environment.application_name;

    this.authService.authEvent.subscribe(user => {
      if (user) {
        this.setLoggedIn(user);
      } else {
        this.setLoggedOut();
      }
    });

    this.setLoginStatus();
    this.configureOAuth();

    this.oauthService.events.subscribe(({ type }: OAuthEvent) => {
      if (this.oauthService.hasValidAccessToken()) {
        this.authService.setUser(this.oauthService.getIdentityClaims());
        this.setLoginStatus();
        this.router.navigate(['/']);
      }
    });
  }

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private router: Router,
    private idle: Idle) {

    // how many seconds of inactivity before a user is considered idle
    this.idle.setIdle(10);

    // after a user goes idle, set how many seconds until the user will be considered timed out.
    this.idle.setTimeout(environment.idleTimeout);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.setLoggedOut();
      this.router.navigate(['logout']);
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log('You\'ve gone idle!');
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

  }

  private async configureOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    await this.oauthService.tryLogin();
    if (environment.oauth.autoRefresh) {
      this.oauthService.setupAutomaticSilentRefresh();
    }
  }

  setLoginStatus() {
    if (this.authService.isAuthenticated()) {
      this.setLoggedIn(this.authService.user);
    } else {
      this.setLoggedOut();
    }
  }

  setLoggedIn(user: any) {
    globalNavModel.loggedIn.links.filter(link => link.id === 'welcome').map(link => this.setUserLink(link, user));
    this.globalNavModel = globalNavModel.loggedIn;
    this.primaryNavModel = primaryNavModel;
    this.sideNavModel = sideNavModel;
    this.user = user;
    this.loggedIn = true;
    this.setNav();
    this.startIdle();
  }
  setLoggedOut() {
    this.globalNavModel = globalNavModel.loggedOut;
    this.primaryNavModel = {};
    this.sideNavModel = {};
    this.loggedIn = false;
    this.setNav();
  }

  setUserLink(link: any, user: any) {
    link.textTemplate = `<span> ${user.give_name} ${user.family_name} </span>`;
  }

  setNav() {
    this.showTopNav = this.navigationMode === 'both' || this.navigationMode === 'top';
    if (this.navigationMode === 'both' || this.navigationMode === 'side') {
      if (this.hideWhenLoggedOut && !this.user) {
        this.showSideNav = false;
      } else {
        this.showSideNav = true;
      }
    } else {
      this.showSideNav = false;
    }
  }

  startIdle() {
    this.idle.watch();
    this.idleState = 'Started.';
  }

}
