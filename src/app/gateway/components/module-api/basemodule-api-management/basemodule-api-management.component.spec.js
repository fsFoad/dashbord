import { TestBed } from '@angular/core/testing';
import { BasemoduleApiManagementComponent } from './basemodule-api-management.component';
describe('BasemoduleApiManagementComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BasemoduleApiManagementComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(BasemoduleApiManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
