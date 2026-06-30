import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointRegisterComponent } from './endpoint-register.component';

describe('EndpointRegisterComponent', () => {
  let component: EndpointRegisterComponent;
  let fixture: ComponentFixture<EndpointRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
