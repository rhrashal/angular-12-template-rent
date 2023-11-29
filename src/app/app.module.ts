import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouteReusableStrategy, ApiPrefixInterceptor, SharedModule } from '@shared';
import { AuthModule } from '../app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EnvServiceProvider } from '@env/env.service.provider';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GrdFilterPipe } from './@shared/GrdFilterPipe';
import { AlertService } from './@shared/AlertService';
import { UserManagementComponent } from './user-management/user-management.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersPermissionsComponent } from './users-permissions/users-permissions.component';

import { LoginConferenceComponent } from './Renu/setups/login-conference/login-conference.component';
// import { BranchSetupComponent } from './Renu/branch-setup/branch-setup.component';
import { BranchSetupComponent } from './Renu/setups/branch-setup/branch-setup.component';
import { RegisterUserComponent } from './Renu/register-user/register-user.component';
import { LandlordSetupComponent } from './Renu/setups/landlord-setup/landlord-setup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RentSetupComponent } from './Renu/setups/rent-setup/rent-setup.component';

import { RentProcessComponent } from './Renu/operation/rentprocess/rent-process/rent-process.component';
import { RentApproveComponent } from './Renu/operation/rentapprove/rent-approve/rent-approve.component';

import { RoleSetupComponent } from './Renu/Permission/role/role-setup.component';
import { MenuPermissionComponent } from './Renu/Permission/menus-permission/menu-permission.component';
import { BranchReportComponent } from './Renu/report/branchreport/branch-report/branch-report.component';
import { RentReportComponent } from './Renu/report/rentreport/rent-report/rent-report.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTablesModule,
    MatDialogModule,
    //ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    NgSelectModule,
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],

  declarations: [
    AppComponent,
    NavMenuComponent,
    GrdFilterPipe,
    UserManagementComponent,
    UsersPermissionsComponent,
    LoginConferenceComponent,
    BranchSetupComponent,
    RegisterUserComponent,
    LandlordSetupComponent,
    RentSetupComponent,

    RentProcessComponent,
    RentApproveComponent,

    RoleSetupComponent,
    MenuPermissionComponent,
    BranchReportComponent,
    RentReportComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandlerInterceptor,
    //   multi: true,
    // },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    EnvServiceProvider,
    AlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
