import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFairComponent } from './career-fair.component';

describe('CareerFairComponent', () => {
  let component: CareerFairComponent;
  let fixture: ComponentFixture<CareerFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
