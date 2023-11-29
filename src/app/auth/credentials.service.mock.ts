import { Credentials } from '../models/Credentials';

export class MockCredentialsService {
  credentials: Credentials | null = {
    username: 'test',
    token: '123',
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: Credentials, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
