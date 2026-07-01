import { TestBed } from '@angular/core/testing';
import { TimeLimitationRegisterComponent } from './time-limitation-register.component';
describe('TimeLimitationRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimeLimitationRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TimeLimitationRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
