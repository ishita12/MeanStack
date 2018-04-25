import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedJobsComponent } from './viewed-jobs.component';

describe('ViewedJobsComponent', () => {
  let component: ViewedJobsComponent;
  let fixture: ComponentFixture<ViewedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
