import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleApiManagementComponent } from './module-api-management.component';

describe('ModuleApiManagementComponent', () => {
  let component: ModuleApiManagementComponent;
  let fixture: ComponentFixture<ModuleApiManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleApiManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleApiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
