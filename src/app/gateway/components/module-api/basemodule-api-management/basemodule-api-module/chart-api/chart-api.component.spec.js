import { TestBed } from '@angular/core/testing';
import { ChartApiComponent } from './chart-api.component';
describe('ChartApiComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChartApiComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ChartApiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
