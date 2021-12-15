import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@core/authentication/auth.guard';



const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      // { path: '403', component: Error403Component },
      // { path: '404', component: Error404Component },
      // { path: '500', component: Error500Component },
      // {
      //   path: 'lead-calling',
      //   loadChildren: () => LeadCallingModule
      // },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    // children: [
    //   { path: 'login', component: LoginComponent },
    // ],
  },
  // {
  //  path: 'login', loadChildren: () => LoginModule
  // },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
