import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuietEventsComponent } from './quiet-events.component';

describe('QuietEventsComponent', () => {
  let component: QuietEventsComponent;
  let fixture: ComponentFixture<QuietEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuietEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuietEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
