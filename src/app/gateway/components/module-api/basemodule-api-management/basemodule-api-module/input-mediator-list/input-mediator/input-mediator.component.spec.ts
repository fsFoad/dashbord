// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMediatorComponent } from './input-mediator.component';

describe('InputMediatorComponent', () => {
  let component: InputMediatorComponent;
  let fixture: ComponentFixture<InputMediatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMediatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMediatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
