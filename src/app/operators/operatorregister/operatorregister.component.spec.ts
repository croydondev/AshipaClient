import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorregisterComponent } from './operatorregister.component';

describe('OperatorregisterComponent', () => {
  let component: OperatorregisterComponent;
  let fixture: ComponentFixture<OperatorregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
