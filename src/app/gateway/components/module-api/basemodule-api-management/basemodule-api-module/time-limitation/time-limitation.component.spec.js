import { TestBed } from '@angular/core/testing';
import { TimeLimitationComponent } from './time-limitation.component';
describe('TimeLimitationComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimeLimitationComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TimeLimitationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
