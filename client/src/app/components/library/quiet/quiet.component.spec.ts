import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuietComponent } from './quiet.component';

describe('QuietComponent', () => {
  let component: QuietComponent;
  let fixture: ComponentFixture<QuietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
