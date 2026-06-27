import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEndpointManagementComponent } from './header-endpoint-management.component';

describe('HeaderEndpointManagementComponent', () => {
  let component: HeaderEndpointManagementComponent;
  let fixture: ComponentFixture<HeaderEndpointManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEndpointManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderEndpointManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
