import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemoduleApiModuleComponent } from './basemodule-api-module.component';

describe('BasemoduleApiModuleComponent', () => {
  let component: BasemoduleApiModuleComponent;
  let fixture: ComponentFixture<BasemoduleApiModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasemoduleApiModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasemoduleApiModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
