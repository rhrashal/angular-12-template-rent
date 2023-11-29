export class User {
  username: string;
  password: string;

  Address: string;
  Email: string;
  isActive: true;
  UserType: string;
  EmailUserId: string;
  EmailPassword: string;
  EmpId: 0;
  Designation: string;
  RecordFilter: 0;
  RecordCount: 0;
  role: string;
  originalUserName: string;
  accessToken: string;
  refreshToken: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.Address = '';
    this.Email = '';
    this.isActive = true;
    this.UserType = '';
    this.EmailUserId = '';
    this.EmailPassword = '';
    this.EmpId = 0;
    this.Designation = '';
    this.RecordFilter = 0;
    this.RecordCount = 0;
    this.role = '';
    this.originalUserName = '';
    this.accessToken = '';
    this.refreshToken = '';
  }
}
