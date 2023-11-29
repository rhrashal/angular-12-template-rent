import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { RentApproveService } from '@app/Renu/service/rentapprove/rent-approve.service';
import { CredentialsService } from '@app/auth';
import { Rent } from '@app/models/Rent';
import { User } from '@app/models/User';

@Component({
  selector: 'app-rent-approve',
  templateUrl: './rent-approve.component.html',
  styleUrls: ['./rent-approve.component.scss'],
})
export class RentApproveComponent implements OnInit {
  rentProcessData: Rent[] | undefined;
  currentUser!: User;
  constructor(
    private alertService: AlertService,
    private rentApproveService: RentApproveService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credentialsService.credentials as User;
    this.retriveRentDataHandler();
  }
  retriveRentDataHandler() {
    this.rentApproveService.getTempProcessRent().subscribe((res) => {
      if (res.length === 0) {
        this.alertService.error('No Rents To Approve');
      } else {
        this.alertService.success('Processed Rents to Approve');
        this.rentProcessData = res;
        this.rentProcessData?.forEach((element) => {
          element.ApprovedBy = this.currentUser.username;
        });
        console.log(this.rentProcessData);
      }
    });
  }
  approveButtonHandler() {
    this.rentApproveService.approveRent(this.rentProcessData).subscribe((res) => {
      if (res) {
        this.alertService.success('Approved Successfully');
      } else {
        this.alertService.error('Something Went Wrong');
      }
      this.rentProcessData = [];
    });
  }
}
