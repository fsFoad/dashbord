import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleApiComponent } from './module-api.component';

describe('ModuleApiComponent', () => {
  let component: ModuleApiComponent;
  let fixture: ComponentFixture<ModuleApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
