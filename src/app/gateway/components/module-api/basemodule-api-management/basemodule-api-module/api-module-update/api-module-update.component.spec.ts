import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiModuleUpdateComponent } from './api-module-update.component';

describe('ApiModuleUpdateComponent', () => {
  let component: ApiModuleUpdateComponent;
  let fixture: ComponentFixture<ApiModuleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiModuleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiModuleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
