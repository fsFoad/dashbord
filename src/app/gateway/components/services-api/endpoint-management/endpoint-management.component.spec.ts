import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointManagementComponent } from './endpoint-management.component';

describe('EndpointManagementComponent', () => {
  let component: EndpointManagementComponent;
  let fixture: ComponentFixture<EndpointManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
