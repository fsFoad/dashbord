import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRuleRegisterComponent } from './api-rule-register.component';

describe('ApiRuleRegisterComponent', () => {
  let component: ApiRuleRegisterComponent;
  let fixture: ComponentFixture<ApiRuleRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRuleRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiRuleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
