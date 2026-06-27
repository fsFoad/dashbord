import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertClientComponent } from './alert-client.component';

describe('AlertClientComponent', () => {
  let component: AlertClientComponent;
  let fixture: ComponentFixture<AlertClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
