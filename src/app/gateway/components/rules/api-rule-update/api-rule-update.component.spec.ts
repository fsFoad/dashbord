import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRuleUpdateComponent } from './api-rule-update.component';

describe('ApiRuleUpdateComponent', () => {
  let component: ApiRuleUpdateComponent;
  let fixture: ComponentFixture<ApiRuleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRuleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiRuleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
