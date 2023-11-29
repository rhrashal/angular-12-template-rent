import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentApproveComponent } from './rent-approve.component';

describe('RentApproveComponent', () => {
  let component: RentApproveComponent;
  let fixture: ComponentFixture<RentApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
