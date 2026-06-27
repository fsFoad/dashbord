import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesManagementComponent } from './messages-management.component';

describe('MessagesManagementComponent', () => {
  let component: MessagesManagementComponent;
  let fixture: ComponentFixture<MessagesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
