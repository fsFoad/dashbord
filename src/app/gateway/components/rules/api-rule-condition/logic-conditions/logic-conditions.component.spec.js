import { TestBed } from '@angular/core/testing';
import { LogicConditionsComponent } from './logic-conditions.component';
describe('LogicConditionsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LogicConditionsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LogicConditionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
