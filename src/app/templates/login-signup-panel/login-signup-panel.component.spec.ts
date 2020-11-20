import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupPanelComponent } from './login-signup-panel.component';

describe('LoginSignupPanelComponent', () => {
  let component: LoginSignupPanelComponent;
  let fixture: ComponentFixture<LoginSignupPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSignupPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
