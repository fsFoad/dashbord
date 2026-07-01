// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicConditionsComponent } from './logic-conditions.component';

describe('LogicConditionsComponent', () => {
  let component: LogicConditionsComponent;
  let fixture: ComponentFixture<LogicConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogicConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
