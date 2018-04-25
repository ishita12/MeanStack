import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuietReservationComponent } from './quiet-reservation.component';

describe('QuietReservationComponent', () => {
  let component: QuietReservationComponent;
  let fixture: ComponentFixture<QuietReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuietReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuietReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
