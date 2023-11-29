import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '@app/models/Branch';
import { Rent } from '@app/models/Rent';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  constructor(private http: HttpClient) {}

  getRnetForDatatable(dataTablesParameters: any) {
    return this.http.post<any>(`${environment.apiUrl}api/Rents/get_for_datatable`, dataTablesParameters, {});
  }

  getAllBranch(): Observable<Branch[]> {
    return this.http.get<any>(`${environment.apiUrl}api/Branches`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllLandlord(): Observable<Rent[]> {
    return this.http.get<any>(`${environment.apiUrl}api/Landlords`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createRent(rent: Rent) {
    return this.http.post<any>(`${environment.apiUrl}api/Rents/create`, rent);
  }
}
