import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuPermission } from '@app/models/MenuPermission';
import { environment } from '@env/environment';
import { DataTablesResponse } from '@app/models/DataTablesResponse';
import { WebMenu } from '@app/models/WebMenu';
import { Result } from '@app/models/Result';

@Injectable({
  providedIn: 'root',
})
export class MenuPermissionService {
  constructor(private http: HttpClient) {}

  getAllMenuByRole(Id: number) {
    return this.http.get<Result>(`${environment.apiUrl}api/Roles/get_AllMenu_By_Roleid?id=${Id}`);
  }
  selectallparent(){
    return this.http.get<Result>(`${environment.apiUrl}api/menus/select_all_parent`);
  }
  selectallchild(){
    return this.http.get<Result>(`${environment.apiUrl}api/menus/select_all_child`);
  }
 createMenuPermission(MenuPermission: any) {
    return this.http.post<Result>(`${environment.apiUrl}api/Roles/role-permission`, MenuPermission);
  }

  // getBrachDetailByUserId() {
  //   alert('Get MenuPermission Detail By User Id');
  // }

  // createMenuPermission(MenuPermission: MenuPermission) {
  //   return this.http.post<MenuPermission>(`${environment.apiUrl}api/MenuPermissions/create`, MenuPermission);
  // }

  // toggleMenuPermission(Id: number) {
  //   return this.http.delete<MenuPermission>(`${environment.apiUrl}api/MenuPermissions/delete/${Id}`);
  // }

  // updateMenuPermission(MenuPermission: MenuPermission) {
  //   return this.http.post<MenuPermission>(`${environment.apiUrl}api/MenuPermissions/update`, MenuPermission);
  // }
  // getForDatatable(dataTablesParameters: any) {
  //   return this.http.post<DataTablesResponse>(
  //     `${environment.apiUrl}api/MenuPermissions/get_for_datatable`,
  //     dataTablesParameters,
  //     {}
  //   );
  // }
}
