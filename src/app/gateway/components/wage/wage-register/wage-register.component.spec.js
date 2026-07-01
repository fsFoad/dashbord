import { TestBed } from '@angular/core/testing';
import { WageRegisterComponent } from './wage-register.component';
describe('WageRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WageRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WageRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
