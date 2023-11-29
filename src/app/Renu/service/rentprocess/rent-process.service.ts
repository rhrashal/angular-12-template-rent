import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rent } from '@app/models/Rent';
import { Result } from '@app/models/Result';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RentProcessService {
  constructor(private http: HttpClient) {}

  getProcessRentBitweenDate() {
    return this.http.get<any>(`${environment.apiUrl}api/Rents/GetProcessRentBetweenDate`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProcessRentByDate(inputDate: string) {
    return this.http
      .get<any>(`${environment.apiUrl}api/Rents/GetProcessRentByDate/?date=${inputDate}`)
      .pipe(map((response: any) => response.Data));
  }
  getRentByDate(inputDate: string) {
    return this.http.get<Result>(`${environment.apiUrl}api/Rents/get_unhold/?date=${inputDate}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  processRent(processRentData: any) {
    return this.http.post<Result>(`${environment.apiUrl}api/Rents/process`, processRentData);
  }
}
