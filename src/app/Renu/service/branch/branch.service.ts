import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Branch } from '@app/models/Branch';
import { environment } from '@env/environment';
import { DataTablesResponse } from '@app/models/DataTablesResponse';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getBranchList() {
    return this.http.get<Branch>(`${environment.apiUrl}api/Branches`);
  }

  getBrachDetailByUserId() {
    alert('Get Branch Detail By User Id');
  }

  createBranch(branch: Branch) {
    return this.http.post<Branch>(`${environment.apiUrl}api/branches/create`, branch);
  }

  toggleBranch(Id: number) {
    return this.http.delete<Branch>(`${environment.apiUrl}api/branches/delete/${Id}`);
  }

  updateBranch(branch: Branch) {
    return this.http.post<Branch>(`${environment.apiUrl}api/branches/update`, branch);
  }
  getForDatatable(dataTablesParameters: any) {
    return this.http.post<DataTablesResponse>(
      `${environment.apiUrl}api/branches/get_for_datatable`,
      dataTablesParameters,
      {}
    );
  }
}
