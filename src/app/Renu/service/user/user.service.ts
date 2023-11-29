import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '@app/models/RegisterUser';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  registerUser(user: RegisterUser) {
    return this.http.post<any>(`${environment.apiUrl}api/account/create`, user);
  }
}
