import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/core/components/account/login/login.component';
import { UnauthorizedComponent } from '@app/core/components/account/unauthorized/unauthorized.component';
import { LogoutComponent } from '@app/core/components/account/logout/logout.component';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { HomeComponent } from '@app/yourapp/home/home.component';
import { AboutComponent } from '@app/yourapp/about/about.component';
import { FeatureToggleComponent } from '@app/feature-toggle/components/feature-toggle/feature-toggle.component';
import { FeatureToggleGuard } from '@app/feature-toggle/guards/feature-toggle.guard';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      breadcrumb: 'About'
    }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  {
    path: 'feature-toggle',
    component: FeatureToggleComponent,
    canActivate: [AuthGuard, FeatureToggleGuard],
    data: {
      featureToggle: 'toggleInterface'
      // anyFeatureFlags: ['toggleInterface', 'breadCrumb']
    }
  },
  { path: 'app', loadChildren: 'app/yourapp/yourapp.module#YourappModule' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {}
