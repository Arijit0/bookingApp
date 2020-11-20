import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsearchpanelComponent } from './flightsearchpanel.component';

describe('FlightsearchpanelComponent', () => {
  let component: FlightsearchpanelComponent;
  let fixture: ComponentFixture<FlightsearchpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsearchpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsearchpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
