import { TestBed } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
describe('UserManagementComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserManagementComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UserManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
