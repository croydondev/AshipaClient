import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorloginComponent } from './operatorlogin.component';

describe('OperatorloginComponent', () => {
  let component: OperatorloginComponent;
  let fixture: ComponentFixture<OperatorloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
