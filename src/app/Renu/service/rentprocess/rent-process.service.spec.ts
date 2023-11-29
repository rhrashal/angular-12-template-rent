import { TestBed } from '@angular/core/testing';

import { RentProcessService } from './rent-process.service';

describe('RentProcessService', () => {
  let service: RentProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
