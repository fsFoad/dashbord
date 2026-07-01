import { TestBed } from '@angular/core/testing';
import { ApiRuleConditionRegisterComponent } from './api-rule-condition-register.component';
describe('ApiRuleConditionRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiRuleConditionRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApiRuleConditionRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
