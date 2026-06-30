import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesRegisterComponent } from './messages-register.component';

describe('MessagesRegisterComponent', () => {
  let component: MessagesRegisterComponent;
  let fixture: ComponentFixture<MessagesRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
