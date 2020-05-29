import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketpreferencesComponent } from './marketpreferences.component';

describe('MarketpreferencesComponent', () => {
  let component: MarketpreferencesComponent;
  let fixture: ComponentFixture<MarketpreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketpreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketpreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
