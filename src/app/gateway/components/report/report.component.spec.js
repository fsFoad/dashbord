import { TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
describe('ReportComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReportComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
