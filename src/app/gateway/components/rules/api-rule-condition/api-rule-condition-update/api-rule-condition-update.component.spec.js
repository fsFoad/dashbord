import { TestBed } from '@angular/core/testing';
import { ApiRuleConditionUpdateComponent } from './api-rule-condition-update.component';
describe('ApiRuleConditionUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiRuleConditionUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApiRuleConditionUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
