import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRecipientsAlertsComponent } from './register-recipients-alerts.component';

describe('RegisterRecipientsAlertsComponent', () => {
  let component: RegisterRecipientsAlertsComponent;
  let fixture: ComponentFixture<RegisterRecipientsAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRecipientsAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRecipientsAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
