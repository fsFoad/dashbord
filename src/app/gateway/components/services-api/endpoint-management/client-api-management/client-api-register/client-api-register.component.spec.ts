import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApiRegisterComponent } from './client-api-register.component';

describe('ClientApiRegisterComponent', () => {
  let component: ClientApiRegisterComponent;
  let fixture: ComponentFixture<ClientApiRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientApiRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientApiRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
