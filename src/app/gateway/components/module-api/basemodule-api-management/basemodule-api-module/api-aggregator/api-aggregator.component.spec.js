import { TestBed } from '@angular/core/testing';
import { ApiAggregatorComponent } from './api-aggregator.component';
describe('ApiAggregatorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApiAggregatorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApiAggregatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
