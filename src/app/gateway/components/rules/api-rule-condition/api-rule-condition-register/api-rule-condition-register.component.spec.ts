import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRuleConditionRegisterComponent } from './api-rule-condition-register.component';

describe('ApiRuleConditionRegisterComponent', () => {
  let component: ApiRuleConditionRegisterComponent;
  let fixture: ComponentFixture<ApiRuleConditionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRuleConditionRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiRuleConditionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
