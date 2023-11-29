import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordSetupComponent } from './landlord-setup.component';

describe('LandlordSetupComponent', () => {
  let component: LandlordSetupComponent;
  let fixture: ComponentFixture<LandlordSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandlordSetupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
