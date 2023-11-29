import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/@shared/AlertService';
import { RegisterUser } from '@app/models/RegisterUser';
import { UserService } from '../service/user/user.service';
import { Role } from '@app/models/Role';
import { WebMenu } from '@app/models/WebMenu';
import { MenuPermission } from '@app/models/MenuPermission';
import { MenuPermissionService } from '../service/menu-permission/menuPermission.service';
import { RoleService } from '../service/role/role.service';
import { CredentialsService } from '@app/auth';
import { Result } from '@app/models/Result';
import { User } from '@app/models/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  ngOnInit(): void {
    this.getallRole();
    this.currentUser = this.credentialsService.credentials as User;
  }
  currentUser!: User;
  user = new RegisterUser();
  public roleList = [];
  public resultMaster: Result = new Result();
  public roleId: string | undefined;
  private selectStatus: boolean = false;
  public ParentmenuList: WebMenu[] = [];
  public ChildmenuList: WebMenu[] = [];
  public menuPermissionList: MenuPermission[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private MenuPermissionService: MenuPermissionService,
    private RoleService: RoleService,
    private alertService: AlertService,
    private credentialsService: CredentialsService
  ) {}

  onSubmit() {
    if (this.roleId == undefined) {
      this.alertService.error('Please Select Role');
      return;
    }
    this.user.RoleId = Number(this.roleId);
    this.userService.registerUser(this.user).subscribe(
      (res) => {
        console.log(res);

        // Redirect the user to the login page
        this.alertService.success('User Created Successfully');
        // this.router.navigate(['/login']);
      },
      (error: Error) => {
        this.alertService.error('User Creation Failed');
        console.error(error);
      }
    );
  }

  getallRole() {
    this.RoleService.getRoleList().subscribe((res) => {
      //this.roleList = res as Role[];
      this.roleList = res as any;
    });
  }
}
