import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargetariffComponent } from './chargetariff.component';

describe('ChargetariffComponent', () => {
  let component: ChargetariffComponent;
  let fixture: ComponentFixture<ChargetariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargetariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargetariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
