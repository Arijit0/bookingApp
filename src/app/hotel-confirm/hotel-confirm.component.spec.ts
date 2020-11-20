import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelConfirmComponent } from './hotel-confirm.component';

describe('HotelConfirmComponent', () => {
  let component: HotelConfirmComponent;
  let fixture: ComponentFixture<HotelConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
