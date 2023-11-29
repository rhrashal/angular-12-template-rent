import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { RentService } from '@app/Renu/service/rent/rent.service';
import { CredentialsService } from '@app/auth';
import { Branch } from '@app/models/Branch';
import { Landlord } from '@app/models/Landlord';
import { Rent } from '@app/models/Rent';
import { User } from '@app/models/User';

@Component({
  selector: 'app-rent-setup',
  templateUrl: './rent-setup.component.html',
  styleUrls: ['./rent-setup.component.scss'],
})
export class RentSetupComponent implements OnInit {
  isInsertMode = false;
  currentUser!: User;
  dtOptions: DataTables.Settings = {};
  dataList: Rent[] | undefined;
  actionText = '';
  branchApiData: Branch[] | undefined;
  landlordApiData: Landlord[] | undefined;
  public Id: string | undefined;
  rent: Rent = new Rent();

  constructor(
    private rentService: RentService,
    private alertService: AlertService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credentialsService.credentials as User;
    this.loadAllRent();
    this.loadBranch();
    this.loadLandlord();
  }

  loadAllRent() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.rentService.getRnetForDatatable(dataTablesParameters).subscribe((resp) => {
          this.dataList = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: [],
          });
        });
      },
      columns: [
        // { data: '' },
        // { data: 'BranchName' },
        // { data: 'LandLordName' },
        { data: 'FloorSpace' },
        // { data: 'AtmSpace' },
        // { data: 'MouDate' },
        // { data: 'MeetingNo' },
        // { data: 'MeetingDate' },
        // { data: 'LeaseAgreExDate' },
        // { data: 'AdvanceMonth' },
        // { data: 'AdvanceAmount' },
        // { data: 'AdvanceAdjustmentMonth' },
        // { data: 'RentEffectiveDate' },
        // { data: 'FloorSFTRent' },
        // { data: 'AtmSFTRent' },
        // { data: 'GenSFTRent' },
        // { data: 'CarParkingRent' },
        // { data: 'ServiceCharge' },
        // { data: 'LessPreYear' },
        // { data: 'ExpairLess' },
        // { data: 'ReviewPercent' },
        // { data: 'ReviewYear' },
        // { data: 'TerminationMonth' },
        // { data: 'CreateBy' },
        // { data: 'CreateDate' },
        // { data: 'UpdateBy' },
        // { data: 'UpdateDate' },
        // { data: 'IsHold' },
        { defaultContent: '', data: 'Empty', orderable: false },
      ],
    };
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

  //rent action
  createButtonClick() {
    this.isInsertMode = true;
    this.actionText = 'Save';
    this.rent.ActionType = 'Create';

    this.rent.CreateBy = this.currentUser.username;
    this.rent.UpdateBy = this.currentUser.username;
    this.rent.CreateDate = this.formatCurrentDate(new Date()) as any;
    this.rent.UpdateDate = this.formatCurrentDate(new Date()) as any;
  }

  backBtnClick() {
    this.isInsertMode = false;
  }

  loadBranch() {
    this.rentService.getAllBranch().subscribe((res) => {
      this.branchApiData = res as any;

      return this.branchApiData;
    });
  }

  loadLandlord() {
    this.rentService.getAllLandlord().subscribe((res) => {
      let landlordList = res as any;
      return (this.landlordApiData = landlordList);
    });
  }
  saveBtnClick() {
    this.rentService.createRent(this.rent).subscribe(
      (res) => {
        this.alertService.success('Rent Saved Successfully');
        this.isInsertMode = false;
        this.loadAllRent();
      },
      (error: any) => {
        this.alertService.error(error.error.toUpperCase());
        console.error(error);
      }
    );
  }
}
