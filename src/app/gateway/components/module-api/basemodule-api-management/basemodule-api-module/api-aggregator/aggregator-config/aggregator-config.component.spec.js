import { TestBed } from '@angular/core/testing';
import { AggregatorConfigComponent } from './aggregator-config.component';
describe('AggregatorConfigComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AggregatorConfigComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AggregatorConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
