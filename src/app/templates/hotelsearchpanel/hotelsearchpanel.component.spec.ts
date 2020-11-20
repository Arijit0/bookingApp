import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsearchpanelComponent } from './hotelsearchpanel.component';

describe('HotelsearchpanelComponent', () => {
  let component: HotelsearchpanelComponent;
  let fixture: ComponentFixture<HotelsearchpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsearchpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsearchpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
