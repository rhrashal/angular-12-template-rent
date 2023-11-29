import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { BranchService } from '@app/Renu/service/branch/branch.service';
import { CredentialsService } from '@app/auth';
import { Branch } from '@app/models/Branch';
import { User } from '@app/models/User';

@Component({
  selector: 'app-branch-setup',
  templateUrl: './branch-setup.component.html',
  styleUrls: ['./branch-setup.component.scss'],
})
export class BranchSetupComponent implements OnInit {
  isInsertMode: boolean = false;
  currentUser!: User;
  actionText = '';
  branchData: any;
  btnText: string = 'Active';

  public dataList: Branch[] | undefined;
  //best idea to use class
  branch: Branch = new Branch();
  dtOptions: DataTables.Settings = {};

  constructor(
    private branchService: BranchService,
    private alertService: AlertService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    this.isInsertMode;
    // this.getall();
    this.loadAllBranch();
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

  //get all data only branch

  getall() {
    this.branchService.getBranchList().subscribe((res) => {
      this.branchData = res;

      this.branchData.forEach((element: any) => {
        element.BBLicenseIssuDate = new Date(element.BBLicenseIssuDate).toLocaleDateString();
        element.OpeningDate = new Date(element.OpeningDate).toLocaleDateString();
        element.CreateDate = new Date(element.CreateDate).toLocaleDateString();
        element.UpdateDate = new Date(element.UpdateDate).toLocaleDateString();
      });

      console.log(this.branchData);
    });
  }

  //get all data using datatable
  loadAllBranch() {
    const that = this;
    console.log('branchData', that.dataList);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.branchService.getForDatatable(dataTablesParameters).subscribe((resp) => {
          that.dataList = resp.data;
          console.log('branchData', that.dataList);
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: [],
          });
        });
      },
      columns: [
        { data: 'Id' },
        { data: 'Name' },
        { data: 'Division' },
        { data: 'Category' },
        { data: 'OpeningDate' },
        { data: 'BBLicenseNo' },
        { data: 'BBLicenseIssuDate' },
        // { data: 'CreateBy' },
        { data: 'CreateDate' },
        { defaultContent: '', data: 'Empty', orderable: false },
      ],
    };
  }

  //action

  editButtonClick(branch: Branch) {
    this.branch = branch;
    this.branch.BBLicenseIssuDate = this.formatCurrentDate(new Date(this.branch.BBLicenseIssuDate as any)) as any;
    this.branch.UpdateBy = this.currentUser.username;
    this.branch.OpeningDate = this.formatCurrentDate(new Date(this.branch.OpeningDate as any)) as any;
    this.branch.CreateDate = this.formatCurrentDate(new Date(this.branch.CreateDate as any)) as any;
    this.branch.UpdateDate = this.formatCurrentDate(new Date(this.branch.UpdateDate as any)) as any;
    this.actionText = 'Update';
    this.isInsertMode = true;
    this.branch.ActionType = 'Update';
  }

  createButtonClick() {
    this.actionText = 'Save';
    this.branch.ActionType = 'Create';
    this.branch.CreateBy = this.currentUser.username;
    this.branch.Category = 'Urban';
    this.branch.BBLicenseIssuDate = this.formatCurrentDate(new Date()) as any;
    this.branch.OpeningDate = this.formatCurrentDate(new Date()) as any;
    this.branch.CreateDate = this.formatCurrentDate(new Date()) as any;
    this.branch.UpdateDate = this.formatCurrentDate(new Date()) as any;
    // console.log(this.branch);
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
    if (this.branch.ActionType == 'Update') {
      this.branchService.updateBranch(this.branch).subscribe(
        (res) => {
          console.log(res);
          this.isInsertMode = false;
          this.getall();
          this.branch = new Branch();
          this.alertService.success('Branch Updated Successfully');
        },
        (error: Error) => {
          this.alertService.error('Branch Updation Failed');
          console.error(error);
        }
      );
    } else {
      this.branch.CreateBy = this.currentUser.username;
      this.branchService.createBranch(this.branch).subscribe(
        (res) => {
          console.log(res);
          this.isInsertMode = false;
          this.getall();
          this.branch = new Branch();
          this.alertService.success('Branch Created Successfully');
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
