// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunConditionComponent } from './test-run-condition.component';

describe('TestRunConditionComponent', () => {
  let component: TestRunConditionComponent;
  let fixture: ComponentFixture<TestRunConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRunConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRunConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
