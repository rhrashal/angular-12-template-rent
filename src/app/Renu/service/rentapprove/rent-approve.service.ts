import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '@app/models/Result';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RentApproveService {
  constructor(private http: HttpClient) {}

  getTempProcessRent() {
    return this.http.get<Result>(`${environment.apiUrl}api/Rents/GetTempProcessRent`).pipe(
      map((response: any) => {
        return response.Data;
      })
    );
  }

  approveRent(rentProceessData: any) {
    return this.http.post<Result>(`${environment.apiUrl}api/Rents/ProcessApproved`, rentProceessData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
