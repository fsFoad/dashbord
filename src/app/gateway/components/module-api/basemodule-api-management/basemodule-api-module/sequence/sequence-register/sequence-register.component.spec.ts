import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceRegisterComponent } from './sequence-register.component';

describe('SequenceRegisterComponent', () => {
  let component: SequenceRegisterComponent;
  let fixture: ComponentFixture<SequenceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
