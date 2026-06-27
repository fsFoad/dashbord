import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApiManagementComponent } from './client-api-management.component';

describe('ClientApiManagementComponent', () => {
  let component: ClientApiManagementComponent;
  let fixture: ComponentFixture<ClientApiManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientApiManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientApiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
