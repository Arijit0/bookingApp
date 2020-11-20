import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelResultsComponent } from './hotel-results.component';

describe('HotelResultsComponent', () => {
  let component: HotelResultsComponent;
  let fixture: ComponentFixture<HotelResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
