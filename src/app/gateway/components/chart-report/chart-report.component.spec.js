import { TestBed } from '@angular/core/testing';
import { ChartReportComponent } from './chart-report.component';
describe('ChartReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChartReportComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ChartReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
