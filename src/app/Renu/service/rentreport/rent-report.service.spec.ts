import { TestBed } from '@angular/core/testing';

import { RentReportService } from './rent-report.service';

describe('RentReportService', () => {
  let service: RentReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
