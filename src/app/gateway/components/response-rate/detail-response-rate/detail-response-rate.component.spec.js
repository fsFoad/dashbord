import { TestBed } from '@angular/core/testing';
import { DetailResponseRateComponent } from './detail-response-rate.component';
describe('DetailResponseRateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailResponseRateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(DetailResponseRateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
