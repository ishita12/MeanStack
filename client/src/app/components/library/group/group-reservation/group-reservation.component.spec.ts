import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupReservationComponent } from './group-reservation.component';

describe('GroupReservationComponent', () => {
  let component: GroupReservationComponent;
  let fixture: ComponentFixture<GroupReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
