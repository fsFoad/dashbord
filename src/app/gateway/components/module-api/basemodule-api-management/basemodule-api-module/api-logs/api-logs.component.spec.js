import { TestBed } from '@angular/core/testing';
import { ApiLogsComponent } from './api-logs.component';
describe('ApiLogsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiLogsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApiLogsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
