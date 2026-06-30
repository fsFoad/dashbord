import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRuleConditionComponent } from './api-rule-condition.component';

describe('ApiRuleConditionComponent', () => {
  let component: ApiRuleConditionComponent;
  let fixture: ComponentFixture<ApiRuleConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRuleConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiRuleConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
