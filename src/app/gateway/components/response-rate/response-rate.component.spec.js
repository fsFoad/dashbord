import { TestBed } from '@angular/core/testing';
import { ResponseRateComponent } from './response-rate.component';
describe('ResponseRateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResponseRateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ResponseRateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
