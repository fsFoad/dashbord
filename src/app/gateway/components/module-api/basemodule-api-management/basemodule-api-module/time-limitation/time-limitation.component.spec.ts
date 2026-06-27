import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitationComponent } from './time-limitation.component';

describe('TimeLimitationComponent', () => {
  let component: TimeLimitationComponent;
  let fixture: ComponentFixture<TimeLimitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLimitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
