import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMediatorListComponent } from './input-mediator-list.component';

describe('InputMediatorListComponent', () => {
  let component: InputMediatorListComponent;
  let fixture: ComponentFixture<InputMediatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMediatorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMediatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
