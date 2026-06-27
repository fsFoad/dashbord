import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducednodeRegisterComponent } from './producednode-register.component';

describe('ProducednodeRegisterComponent', () => {
  let component: ProducednodeRegisterComponent;
  let fixture: ComponentFixture<ProducednodeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducednodeRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducednodeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
