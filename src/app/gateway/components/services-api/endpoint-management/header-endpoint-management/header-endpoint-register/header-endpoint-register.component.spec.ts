import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEndpointRegisterComponent } from './header-endpoint-register.component';

describe('HeaderEndpointRegisterComponent', () => {
  let component: HeaderEndpointRegisterComponent;
  let fixture: ComponentFixture<HeaderEndpointRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEndpointRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderEndpointRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
