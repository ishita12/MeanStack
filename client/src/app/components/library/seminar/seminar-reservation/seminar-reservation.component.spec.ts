import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarReservationComponent } from './seminar-reservation.component';

describe('SeminarReservationComponent', () => {
  let component: SeminarReservationComponent;
  let fixture: ComponentFixture<SeminarReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminarReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
