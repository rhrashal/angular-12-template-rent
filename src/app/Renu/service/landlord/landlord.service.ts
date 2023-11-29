import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTablesResponse } from '@app/models/DataTablesResponse';
import { Landlord } from '@app/models/Landlord';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LandlordService {
  constructor(private http: HttpClient) {}

  getForDatatable(dataTablesParameters: any) {
    return this.http.post<DataTablesResponse>(
      `${environment.apiUrl}api/Landlords/get_for_datatable`,
      dataTablesParameters,
      {}
    );
  }

  createLandlord(landlord: Landlord) {
    return this.http.post<any>(`${environment.apiUrl}api/Landlords/create`, landlord);
  }

  updateLandlord(landlord: Landlord) {
    return this.http.post<any>(`${environment.apiUrl}api/Landlords/update`, landlord);
  }

  //

  getLandlordListById(id: number): Observable<Landlord> {
    return this.http
      .get<any>(`${environment.apiUrl}api/Landlords/get_by_id?id=${id}`)
      .pipe(map((response: any) => response.Data));
  }
}
