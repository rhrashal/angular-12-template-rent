import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/AlertService';
import { RentProcessService } from '@app/Renu/service/rentprocess/rent-process.service';
import { CredentialsService } from '@app/auth';
import { Rent } from '@app/models/Rent';
import { RentProcess } from '@app/models/RentProcess';
import { User } from '@app/models/User';
// import { get } from 'jquery';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent-process',
  templateUrl: './rent-process.component.html',
  styleUrls: ['./rent-process.component.scss'],
})
export class RentProcessComponent implements OnInit {
  closeResult = '';
  actionText = '';
  isInsertMode: boolean = false;
  currentDate = new Date();
  currentUser!: User;

  rentProcessData: Rent[] | undefined;

  inputDateData: string = '';

  rentProcess = new RentProcess();

  years = this.getYearRange();

  constructor(
    private rentProcessService: RentProcessService,
    private alertService: AlertService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    // console.log(this.years);
    this.currentUser = this.credentialsService.credentials as User;
  }

  months: any[] = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];

  getYearRange() {
    var currentYear = new Date().getFullYear();
    var startYear = currentYear - 5;
    var endYear = currentYear + 30;

    var years = [];
    for (var year = startYear, id = 0; year <= endYear; year++, id++) {
      years.push({
        id: year,
        name: year,
      });
    }

    return years;
  }

  //Action

  retriveRentDataHandler(inputDateData: string) {
    // Create a date object with the current date
    //var currentDate = new Date();
    var d = this.rentProcess.year;
    // Set the year to 2022

    this.currentDate.setFullYear(Number(this.rentProcess.year));
    this.currentDate.setMonth(Number(this.rentProcess.month) - 1);

    if (this.rentProcess.year == undefined && this.rentProcess.month == undefined) {
      this.alertService.error('Please Select Year and Month');
      return;
    } else if (this.rentProcess.year == undefined) {
      this.alertService.error('Please Select Year');
      return;
    } else if (this.rentProcess.month == undefined) {
      this.alertService.error('Please Select Month');
      return;
    } else {
      this.rentProcessService.getRentByDate(this.currentDate.toLocaleDateString()).subscribe((res) => {
        if (res.length == 0) {
          this.alertService.error('No Data Found');
          return;
        } else {
          this.alertService.success('Rents Found');
          this.rentProcessData = res;
          // console.log(res);
        }
      });
    }
  }
  formatCurrentDate(date: any) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    var today = year + '-' + month + '-' + day;
    return today;
  }

  processButtonHandler() {
    if (this.rentProcessData === undefined) {
      this.alertService.error('Please Press Get Rents First');
      return;
    }
    if (this.rentProcessData.length === 0) {
      this.alertService.error('No Data Found');
      return;
    }
    if (this.rentProcessData.length > 0) {
      this.rentProcessData.forEach((element) => {
        element.Date = this.currentDate.toISOString();
      });

      // this.rentProcessService.getTempProcessRent().subscribe(
      //   (res) => {
      //     console.log(res);
      //     debugger;
      //     if (res.length > 0) {
      //       this.alertService.error('Rent already processed,Please approve first.');
      //       return;
      //     }
      //   },
      //   (error: any) => {
      //     this.alertService.error(error.error.toUpperCase());
      //     return;
      //   }
      // );
      // debugger;
      this.rentProcessService.getProcessRentByDate(this.currentDate.toISOString()).subscribe(
        (res) => {
          if (res !== null) {
            debugger;
            Swal.fire({
              title: 'Do you want to Regenerate?',
              text: 'Rent already generated this month',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#4255b5',
              cancelButtonColor: '#333',
              confirmButtonText: 'Process',
            }).then((result) => {
              if (result.isConfirmed) {
                this.rentProcessService.processRent(this.rentProcessData).subscribe(
                  (res) => {
                    this.alertService.success('Rent Processed Successfully');
                  },
                  (error: any) => {
                    this.alertService.error(error.error.toUpperCase());
                  }
                );
              }
            });
          } else {
            console.log('else');
            this.rentProcessService.processRent(this.rentProcessData).subscribe(
              (res) => {
                this.alertService.success('Rent Processed Successfully');
              },
              (error: any) => {
                this.alertService.error(error.error.toUpperCase());
              }
            );
          }
        },
        (error: any) => {
          this.alertService.error('An error occurred while getting process rent data.');
        }
      );
    }
    this.rentProcessData = [];
  }
}
