import { TestBed } from '@angular/core/testing';
import { AlertManagementComponent } from './alert-management.component';
describe('AlertManagementComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertManagementComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AlertManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
