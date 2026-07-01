import { TestBed } from '@angular/core/testing';
import { PartyChartComponent } from './party-chart.component';
describe('PartyChartComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PartyChartComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PartyChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
