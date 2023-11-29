import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '@app/@shared/AlertService';
import { CredentialsService } from '@app/auth';
import { DataTablesResponse } from '@app/models/DataTablesResponse';
import { LoginConference } from '@app/models/LoginConference';
import { Result } from '@app/models/Result';
import { ShopList } from '@app/models/ShopList';
import { EnvService } from '@env/environment';

@Component({
  selector: 'app-login-conference',
  templateUrl: './login-conference.component.html',
  styleUrls: ['./login-conference.component.scss'],
})
export class LoginConferenceComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public model: LoginConference;
  public dataList: LoginConference[] | undefined;
  public resultMaster: Result | undefined;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private env: EnvService,
    private sanitizer: DomSanitizer,
    private credentinal: CredentialsService
  ) {
    this.model = new LoginConference();
  }

  loadAllLogedInUser() {
    // const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(this.env.apiUrl + 'api/Account/get_login_conference', dataTablesParameters, {})
          .subscribe((resp) => {
            debugger;
            this.dataList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'ShopID' },
        { data: 'UserId' },
        { data: 'CounterName' },
        { data: 'LoginTime' },
        { defaultContent: '', data: 'Empty', orderable: false },
      ],
    };
  }

  logOffbuttonClick(id: any) {
    this.alertService.clear();
    // this.model = new LoginConference();
    this.http.get<Result>(this.env.apiUrl + 'api/Account/remove_login_user?UserId=' + id).subscribe(
      (result) => {
        debugger;
        this.resultMaster = result;
        window.location.reload();
      },
      (error) => {
        console.error(error);
        this.alertService.error(error.error);
      }
    );
  }
  ngOnInit(): void {
    this.loadAllLogedInUser();
  }
}
