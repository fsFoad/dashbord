import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleApiUpdateComponent } from './module-api-update.component';

describe('ModuleApiUpdateComponent', () => {
  let component: ModuleApiUpdateComponent;
  let fixture: ComponentFixture<ModuleApiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleApiUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleApiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
