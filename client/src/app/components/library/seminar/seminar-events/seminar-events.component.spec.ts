import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarEventsComponent } from './seminar-events.component';

describe('SeminarEventsComponent', () => {
  let component: SeminarEventsComponent;
  let fixture: ComponentFixture<SeminarEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminarEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
