import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrewardsComponent } from './myrewards.component';

describe('MyrewardsComponent', () => {
  let component: MyrewardsComponent;
  let fixture: ComponentFixture<MyrewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
