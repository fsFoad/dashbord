import { TestBed } from '@angular/core/testing';
import { LogReportsComponent } from './log-reports.component';
describe('LogReportsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogReportsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LogReportsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
