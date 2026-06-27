import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemoduleApiPartyManagementComponent } from './basemodule-api-party-management.component';

describe('BasemoduleApiPartyManagementComponent', () => {
  let component: BasemoduleApiPartyManagementComponent;
  let fixture: ComponentFixture<BasemoduleApiPartyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasemoduleApiPartyManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasemoduleApiPartyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
