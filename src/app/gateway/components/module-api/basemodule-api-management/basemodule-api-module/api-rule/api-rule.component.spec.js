import { TestBed } from '@angular/core/testing';
import { ApiRuleComponent } from './api-rule.component';
describe('ApiRuleComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiRuleComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApiRuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
