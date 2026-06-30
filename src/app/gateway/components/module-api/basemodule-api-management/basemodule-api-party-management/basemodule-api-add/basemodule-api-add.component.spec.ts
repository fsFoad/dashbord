import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemoduleApiAddComponent } from './basemodule-api-add.component';

describe('BasemoduleApiAddComponent', () => {
  let component: BasemoduleApiAddComponent;
  let fixture: ComponentFixture<BasemoduleApiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasemoduleApiAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasemoduleApiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
