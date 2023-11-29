import { TestBed } from '@angular/core/testing';

import { RentApproveService } from './rent-approve.service';

describe('RentApproveService', () => {
  let service: RentApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
