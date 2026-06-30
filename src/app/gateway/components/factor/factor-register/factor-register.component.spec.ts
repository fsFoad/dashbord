import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorRegisterComponent } from './factor-register.component';

describe('FactorRegisterComponent', () => {
  let component: FactorRegisterComponent;
  let fixture: ComponentFixture<FactorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
