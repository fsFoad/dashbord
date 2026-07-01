import { TestBed } from '@angular/core/testing';
import { PartyManagementComponent } from './party-management.component';
describe('PartyManagementComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PartyManagementComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PartyManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
