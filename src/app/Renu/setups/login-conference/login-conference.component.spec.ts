import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConferenceComponent } from './login-conference.component';

describe('LoginConferenceComponent', () => {
  let component: LoginConferenceComponent;
  let fixture: ComponentFixture<LoginConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginConferenceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
