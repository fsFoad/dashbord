import { TestBed } from '@angular/core/testing';
import { PartyChartDetailsComponent } from './party-chart-details.component';
describe('PartyChartDetailsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PartyChartDetailsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PartyChartDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
