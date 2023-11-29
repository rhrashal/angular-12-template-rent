import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { UsersPermissionsComponent } from './users-permissions/users-permissions.component';

import { LoginConferenceComponent } from './Renu/setups/login-conference/login-conference.component';

import { RegisterUserComponent } from './Renu/register-user/register-user.component';
import { BranchSetupComponent } from './Renu/setups/branch-setup/branch-setup.component';
import { LandlordSetupComponent } from './Renu/setups/landlord-setup/landlord-setup.component';
import { RentSetupComponent } from './Renu/setups/rent-setup/rent-setup.component';
import { RoleSetupComponent } from './Renu/Permission/role/role-setup.component';
import { MenuPermissionComponent } from './Renu/Permission/menus-permission/menu-permission.component';

import { RentApproveComponent } from './Renu/operation/rentapprove/rent-approve/rent-approve.component';
import { RentProcessComponent } from './Renu/operation/rentprocess/rent-process/rent-process.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: 'user-management', component: UserManagementComponent, data: { title: marker('User Management') } },
  { path: 'userpermission', component: UsersPermissionsComponent, data: { title: marker('User Permission') } },

  { path: 'setups/login-conference', component: LoginConferenceComponent, data: { title: marker('login-conference') } },
  { path: 'setups/branch-setup', component: BranchSetupComponent, data: { title: marker('branch-setup') } },
  { path: 'setups/Landlord-setup', component: LandlordSetupComponent, data: { title: marker('landlord-setup') } },
  { path: 'setups/Rent-setup', component: RentSetupComponent, data: { title: marker('landlord-setup') } },
  { path: 'admin/register-user', component: RegisterUserComponent, data: { title: marker('register-user') } },
  { path: 'admin/Role-setup', component: RoleSetupComponent, data: { title: marker('role') } },
  { path: 'admin/menu-permission', component: MenuPermissionComponent, data: { title: marker('menu-permission') } },
  { path: 'setups/Rent-setup', component: RentSetupComponent, data: { title: marker('Rent-setup') } },
  { path: 'rent/process', component: RentProcessComponent, data: { title: marker('process') } },
  { path: 'rent/ProcessApproved', component: RentApproveComponent, data: { title: marker('RentApprove') } },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
