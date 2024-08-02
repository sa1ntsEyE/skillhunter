import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardsfooterComponent } from './profile-cardsfooter.component';

describe('ProfileCardsfooterComponent', () => {
  let component: ProfileCardsfooterComponent;
  let fixture: ComponentFixture<ProfileCardsfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCardsfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileCardsfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
