import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallServicesReportComponent } from './call-services-report.component';

describe('CallServicesReportComponent', () => {
  let component: CallServicesReportComponent;
  let fixture: ComponentFixture<CallServicesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallServicesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallServicesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
