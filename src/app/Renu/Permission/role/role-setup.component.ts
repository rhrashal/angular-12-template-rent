import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { RoleService } from '@app/Renu/service/role/role.service';
import { CredentialsService } from '@app/auth';
import { User } from '@app/models/User';
import { Role } from '@app/models/Role';

@Component({
  selector: 'app-role-setup',
  templateUrl: './role-setup.component.html',
  styleUrls: ['./role-setup.component.scss'],
})
export class RoleSetupComponent implements OnInit {
  isInsertMode: boolean = false;
  currentUser!: User;
  actionText = '';
  roleData: any;
  btnText: string = 'Active';

  public dataList: Role[] | undefined;
  //best idea to use class
  Role: Role = new Role();
  dtOptions: DataTables.Settings = {};

  constructor(
    private RoleService: RoleService,
    private alertService: AlertService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    this.isInsertMode;
    // this.getall();
    this.loadAllRole();
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

  //get all data only Role

  getall() {
    this.RoleService.getRoleList().subscribe((res) => {
      this.roleData = res;

      this.roleData.forEach((element: any) => {
        element.CreateDate = new Date(element.CreateDate).toLocaleDateString();
        element.UpdateDate = new Date(element.UpdateDate).toLocaleDateString();
      });

      console.log(this.roleData);
    });
  }

  //get all data using datatable
  loadAllRole() {
    const that = this;
    console.log('roleData', that.dataList);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.RoleService.getForDatatable(dataTablesParameters).subscribe((resp) => {
          that.dataList = resp.data;
          console.log('roleData', that.dataList);
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: [],
          });
        });
      },
      columns: [
        { data: 'RoleId' },
        { data: 'Name' },
        
        { data: 'CreateBy' },
        { data: 'CreateDate' },
        { defaultContent: '', data: 'Empty', orderable: false },
      ],
    };
  }

  //action

  editButtonClick(Role: Role) {
    this.Role = Role;
   
    this.Role.UpdateBy = this.currentUser.username;
    this.Role.CreateDate = this.formatCurrentDate(new Date(this.Role.CreateDate as any)) as any;
    this.Role.UpdateDate = this.formatCurrentDate(new Date(this.Role.UpdateDate as any)) as any;
    this.actionText = 'Update';
    this.isInsertMode = true;
    this.Role.ActionType = 'Update';
  }

  createButtonClick() {
    this.actionText = 'Save';
    this.Role.ActionType = 'Create';
    this.Role.CreateBy = this.currentUser.username;
    this.Role.CreateDate = this.formatCurrentDate(new Date()) as any;
    this.Role.UpdateDate = this.formatCurrentDate(new Date()) as any;
    // console.log(this.Role);
    this.isInsertMode = true;
  }
  toggleButtonClick(Id: number) {
    this.btnText = this.btnText === 'Active' ? 'Inactive' : 'Active';
    // alert('toggle Button Clicked');
  }

  addButtonClick() {
    alert('Add Button Clicked');
  }

  saveButtonClick() {
    if (this.Role.ActionType == 'Update') {
      this.Role.UpdateBy = this.currentUser.username;
      console.log(this.Role);
      this.Role.UpdateDate = this.formatCurrentDate(new Date()) as any;
      this.RoleService.updateRole(this.Role).subscribe(
        (res) => {
          console.log(res);
          this.isInsertMode = false;
          this.getall();
          this.Role = new Role();
          this.alertService.success('Role Updated Successfully');
        },
        (error: Error) => {
          this.alertService.error('Role Updation Failed');
          console.error(error);
        }
      );
    } else {
      this.Role.CreateBy = this.currentUser.username;
      this.Role.IsActive=true;
      this.RoleService.createRole(this.Role).subscribe(
        (res) => {
          console.log(res);
          this.isInsertMode = false;
          this.getall();
          this.Role = new Role();
          this.alertService.success('Role Created Successfully');
        },
        (error: any) => {
          this.alertService.error(error.error.toUpperCase());
          // console.error(error);
        }
      );
    }
  }

  cancleButtonClick() {
    this.isInsertMode = false;
    this.getall();
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
