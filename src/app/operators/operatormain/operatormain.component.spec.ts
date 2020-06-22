import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatormainComponent } from './operatormain.component';

describe('OperatormainComponent', () => {
  let component: OperatormainComponent;
  let fixture: ComponentFixture<OperatormainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatormainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatormainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
