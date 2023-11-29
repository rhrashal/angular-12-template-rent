import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { LandlordService } from '@app/Renu/service/landlord/landlord.service';
import { CredentialsService } from '@app/auth';
import { Landlord } from '@app/models/Landlord';
import { Nominess } from '@app/models/Nominees';
import { User } from '@app/models/User';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landlord-setup',
  templateUrl: './landlord-setup.component.html',
  styleUrls: ['./landlord-setup.component.scss'],
})
export class LandlordSetupComponent implements OnInit {
  closeResult = '';

  isInsertMode: boolean = false;

  currentUser!: User;
  dtOptions: DataTables.Settings = {};
  dataList: Landlord[] | undefined;
  actionText = '';

  landlord: Landlord = new Landlord();
  nominee: Nominess = new Nominess();
  nominee2: Nominess = new Nominess();

  constructor(
    private landlordService: LandlordService,
    private alertService: AlertService,
    private credentialsService: CredentialsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadAllLandlord();
    this.currentUser = this.credentialsService.credentials as User;
  }

  //Dialog

  openNew(content: any) {
    this.nominee = new Nominess();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openNomineeEdit(x: Nominess, content: any) {
    this.nominee = new Nominess();
    this.nominee = { ...x };
    this.modalService.open(content);
  }

  showLandlordById(id: any, content: any) {
    this.landlordService.getLandlordListById(id).subscribe((res) => {
      this.landlord = res;
      this.modalService.open(content);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Service Call

  //Datatable Data Load
  loadAllLandlord() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.landlordService.getForDatatable(dataTablesParameters).subscribe((resp) => {
          this.dataList = resp.data;
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
        { data: 'Email' },
        // { data: 'Nominees' },
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

  //Action Button

  createButtonClick() {
    this.landlord = new Landlord();
    this.isInsertMode = true;
    this.actionText = 'Save';
    this.landlord.ActionType = 'Create';
    // this.landlord.UpdateBy = this.currentUser.username;
    this.landlord.CreateBy = this.currentUser.username;
    this.landlord.CreateDate = this.formatCurrentDate(new Date()) as any;
    this.landlord.UpdateDate = this.formatCurrentDate(new Date()) as any;
  }

  editLandlordButtonClick(x: any) {
    this.isInsertMode = true;
    this.landlordService.getLandlordListById(x.Id).subscribe((res) => {
      this.landlord = res;
      this.landlord.ActionType = 'Update';
      this.landlord.UpdateBy = this.currentUser.username;
      this.landlord.CreateBy = this.currentUser.username;
      this.landlord.CreateDate = this.formatCurrentDate(new Date()) as any;
      this.landlord.UpdateDate = this.formatCurrentDate(new Date()) as any;
    });
    this.actionText = 'Update';
  }
  saveButtonClick() {
    this.isInsertMode = false;
    // this.landlord.UpdateBy = this.currentUser.username;
    this.landlord.CreateDate = this.formatCurrentDate(new Date()) as any;
    this.landlord.UpdateDate = this.formatCurrentDate(new Date()) as any;

    if (this.landlord.ActionType == 'Update') {
      console.log('dd', this.landlord);

      this.landlordService.updateLandlord(this.landlord).subscribe(
        (res) => {
          this.alertService.success('Landlord Updated Successfully');
          this.loadAllLandlord();
        },
        (error: any) => {
          this.alertService.error(error.error.toUpperCase());
          console.error(error);
        }
      );
    } else {
      this.landlordService.createLandlord(this.landlord).subscribe(
        (res) => {
          this.alertService.success('Landlord Created Successfully');
          this.loadAllLandlord();
        },
        (error: any) => {
          this.alertService.error(error.error.toUpperCase());
          console.error(error);
        }
      );
    }
  }

  cancleButtonClick() {
    this.isInsertMode = false;
    // this.loadAllLandlord();
  }

  destailButtonClick(x: any) {
    this.isInsertMode = true;
  }
  //Nominee action

  addNominee() {
    this.nominee.CreateBy = this.currentUser.username;
    this.nominee.CreateDate = this.formatCurrentDate(new Date()) as any;
    this.nominee.UpdateDate = this.formatCurrentDate(new Date()) as any;
    this.nominee.LandLordId = 0;
    this.landlord.Nominees?.push(this.nominee);
    this.nominee = new Nominess();
    this.modalService.dismissAll();
  }

  removeNominee() {
    this.landlord.Nominees?.splice(0, 1);
    console.log(this.landlord);
  }

  updateNominee() {
    this.nominee.UpdateBy = this.currentUser.username;
    this.nominee.UpdateDate = this.formatCurrentDate(new Date()) as any;

    this.updateItem(this.nominee);
    console.log(this.nominee);
    this.modalService.dismissAll();
  }
  //update nominee
  updateItem(updatedItem: Nominess) {
    this.landlord.Nominees = this.landlord.Nominees.map((item) => {
      if (item.Id === updatedItem.Id) {
        return updatedItem; // Replace the object with the updated version
      }
      return item; // Keep the existing object
    });
  }
}
