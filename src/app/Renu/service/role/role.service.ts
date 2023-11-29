import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '@app/models/Role';
import { environment } from '@env/environment';
import { DataTablesResponse } from '@app/models/DataTablesResponse';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoleList() {
    return this.http.get(`${environment.apiUrl}api/Roles`);
  }

  getBrachDetailByUserId() {
    alert('Get Role Detail By User Id');
  }

  createRole(Role: Role) {
    return this.http.post<Role>(`${environment.apiUrl}api/Roles/create`, Role);
  }

  toggleRole(Id: number) {
    return this.http.delete<Role>(`${environment.apiUrl}api/Roles/delete/${Id}`);
  }

  updateRole(Role: Role) {
    return this.http.post<Role>(`${environment.apiUrl}api/Roles/update`, Role);
  }
  getForDatatable(dataTablesParameters: any) {
    return this.http.post<DataTablesResponse>(
      `${environment.apiUrl}api/Roles/get_for_datatable`,
      dataTablesParameters,
      {}
    );
  }
}
