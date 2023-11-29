import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { MenuPermissionService } from '@app/Renu/service/menu-permission/menuPermission.service';
import { RoleService } from '@app/Renu/service/role/role.service';

import { CredentialsService } from '@app/auth';
import { User } from '@app/models/User';
import { MenuPermission } from '@app/models/MenuPermission';
import { Role } from '@app/models/Role';
import { Result } from '@app/models/Result';
import { WebMenu } from '@app/models/WebMenu';

@Component({
  selector: 'app-MenuPermission-setup',
  templateUrl: './menu-permission.component.html',
  styleUrls: ['./menu-permission.component.scss'],
})
export class MenuPermissionComponent implements OnInit {
  isInsertMode: boolean = false;
  currentUser!: User;
  actionText = '';
  MenuPermissionData: any;
  btnText: string = 'Active';
  public resultMaster: Result;
  public roleId: string | undefined;

  //public roleList: Role[] | undefined;
  public roleList = [];
  public menuList = [];
  public ParentmenuList: WebMenu[];
  public ChildmenuList: WebMenu[];
  public menuPermissionList: MenuPermission[];
  //best idea to use class
  MenuPermission: MenuPermission = new MenuPermission();
  dtOptions: DataTables.Settings = {};
  private selectStatus: boolean;

  constructor(
    private MenuPermissionService: MenuPermissionService,
    private RoleService: RoleService,
    private alertService: AlertService,
    private credentialsService: CredentialsService
  ) {
    this.resultMaster = new Result();
    this.ParentmenuList = [];
    this.ChildmenuList = [];
    this.menuPermissionList = [];
    this.selectStatus = false;
  }

  ngOnInit() {
    this.isInsertMode;
    this.getallRole();
    this.loadMenuData();
    //this.loadAllMenuPermission();
    this.currentUser = this.credentialsService.credentials as User;
  }

  //Date Formatter
  formatCurrentDate(date: any) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    var today = year + '-' + month + '-' + day;
    return today;
  }

  //get all data only MenuPermission

  getallRole() {
    this.RoleService.getRoleList().subscribe((res) => {
      //this.roleList = res as Role[];
      this.roleList = res as any;
    });
  }

  roleChange(event: any) {
    let eventData: Role = event as Role;
    this.selectStatus = false;
    for (var i = 0; i < this.ParentmenuList.length; i++) {
      this.ParentmenuList[i].isShowable =
        this.ParentmenuList[i].MenuOwner == 'All'
          ? true
          : eventData.RoleId == this.ParentmenuList[i].MenuOwner
          ? true
          : false;
      this.ParentmenuList[i].Checked = false;
    }
    for (var i = 0; i < this.ChildmenuList.length; i++) {
      this.ChildmenuList[i].isShowable =
        this.ChildmenuList[i].MenuOwner == 'All'
          ? true
          : eventData.RoleId == this.ChildmenuList[i].MenuOwner
          ? true
          : false;
      this.ChildmenuList[i].Checked = false;
    }

    this.MenuPermissionService.getAllMenuByRole(Number(this.roleId)).subscribe((res) => {
      this.resultMaster = res;

      if (this.resultMaster.Status == true) {
        // this.designationList = JSON.parse(this.resultMaster.Data);
        let dataModel: WebMenu[] = this.resultMaster.Data as WebMenu[];

        for (var i = 0; i < dataModel.length; i++) {
          for (var j = 0; j < this.ParentmenuList.length; j++) {
            if (this.ParentmenuList[j].isShowable) {
              if (dataModel[i].ID == this.ParentmenuList[j].ID) {
                if (dataModel[i].IsShow) {
                  this.ParentmenuList[j].Checked = true;
                }
              }
            }
          }
          for (var k = 0; k < this.ChildmenuList.length; k++) {
            if (dataModel[i].ID == this.ChildmenuList[k].ID) {
              if (dataModel[i].IsShow) {
                this.ChildmenuList[k].Checked = true;
              }
            }
          }
        }
      } else {
        this.alertService.error(this.resultMaster.Message as string);
      }
    });
  }

  loadMenuData() {
    //let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.MenuPermissionService.selectallparent().subscribe(
      (res) => {
        this.resultMaster = res;
        console.log('parent', res);
        if (this.resultMaster.Status == true) {
          // this.designationList = JSON.parse(this.resultMaster.Data);
          this.ParentmenuList = this.resultMaster.Data as WebMenu[];
        }
      },
      (error) => {
        console.error(error);
        this.alertService.error(error.error);
      }
    );

    this.MenuPermissionService.selectallchild().subscribe(
      (res) => {
        this.resultMaster = res;
        if (this.resultMaster.Status == true) {
          // this.designationList = JSON.parse(this.resultMaster.Data);
          this.ChildmenuList = this.resultMaster.Data as WebMenu[];
        }
      },
      (error) => {
        console.error(error);
        this.alertService.error(error.error);
      }
    );
  }
  backbuttonClick() {
    this.alertService.clear();
    if (this.selectStatus == true) {
      for (var i = 0; i < this.ParentmenuList.length; i++) {
        this.ParentmenuList[i].Checked = false;
      }
      for (var i = 0; i < this.ChildmenuList.length; i++) {
        this.ChildmenuList[i].Checked = false;
      }
      this.selectStatus = false;
    } else {
      for (var i = 0; i < this.ParentmenuList.length; i++) {
        if (this.ParentmenuList[i].isShowable) {
          this.ParentmenuList[i].Checked = true;
        }
      }
      for (var i = 0; i < this.ChildmenuList.length; i++) {
        var isShowable = this.ParentmenuList.filter((t) => t.ID === this.ChildmenuList[i].ParentID)[0].isShowable;
        if (isShowable) {
          this.ChildmenuList[i].Checked = true;
        }
      }
      this.selectStatus = true;
    }
  }

  savebuttonClick() {
    this.alertService.clear();
    if (!this.roleId) {
      this.alertService.error('Select Role');
      return;
    }

    this.menuPermissionList = [];
    //var meunuIds: string;
    // meunuIds = '';

    this.selectStatus = false;
    for (var i = 0; i < this.ParentmenuList.length; i++) {
      if (this.ParentmenuList[i].Checked == true) {
        var um: any = {};
        um.RoleMenuId = 0;
        um.MenuId = this.ParentmenuList[i].ID;
        um.RoleId = Number(this.roleId);
        this.menuPermissionList.push(um);
      }
    }
    for (var i = 0; i < this.ChildmenuList.length; i++) {
      if (this.ChildmenuList[i].Checked == true) {
        //meunuIds += this.ChildmenuList[i].ID + ',';

        var um: any = {};
        um.RoleMenuId = 0;
        um.MenuId = this.ChildmenuList[i].ID;
        um.RoleId = Number(this.roleId);
        this.menuPermissionList.push(um);
      }
    }

    this.MenuPermissionService.createMenuPermission(this.menuPermissionList).subscribe(
      (res) => {
        this.alertService.success('Role Created Successfully');
      },
      (error: any) => {
        this.alertService.error(error.error.toUpperCase());
        // console.error(error);
      }
    );
    //userMenus.ID = meunuIds;
    //userMenus.UserName = this.UserName;

    var url: string = 'api/menus/Menus_InsertUpdate';
    //if (this.model.RawCategoryID)
    // url = 'api/setup/RawCategorySetup_Update';

    // this.http.post<Result>(this.env.apiUrl + url, userMenus).subscribe(
    //   (result) => {
    //     this.resultMaster = result;
    //     if (this.resultMaster.Status == true) {
    //       // this.designationList = JSON.parse(this.resultMaster.Data);
    //       this.alertService.success('Data Saved Successfully');
    //     } else {
    //       this.alertService.error(this.resultMaster.Message as string);
    //     }
    //   },
    //   (error) => {
    //     this.alertService.error(error.error);
    //   }
    // );
  }

  closeButtonClick() {
    alert('Close Button Clicked');
  }

  fileChange(event: any) {
    alert('File Changed');
  }

  downloadButtonClick(event: any) {
    alert('Download Button Clicked');
  }
}
