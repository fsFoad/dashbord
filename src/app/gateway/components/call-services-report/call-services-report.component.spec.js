import { TestBed } from '@angular/core/testing';
import { CallServicesReportComponent } from './call-services-report.component';
describe('CallServicesReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CallServicesReportComponent]
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
