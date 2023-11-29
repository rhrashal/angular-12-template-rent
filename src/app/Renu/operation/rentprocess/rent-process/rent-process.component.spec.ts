import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentProcessComponent } from './rent-process.component';

describe('RentProcessComponent', () => {
  let component: RentProcessComponent;
  let fixture: ComponentFixture<RentProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
