import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentSetupComponent } from './rent-setup.component';

describe('RentSetupComponent', () => {
  let component: RentSetupComponent;
  let fixture: ComponentFixture<RentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentSetupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
