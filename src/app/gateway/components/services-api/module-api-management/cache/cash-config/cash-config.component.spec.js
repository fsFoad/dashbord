import { TestBed } from '@angular/core/testing';
import { CashConfigComponent } from './cash-config.component';
describe('CashConfigComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CashConfigComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CashConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
