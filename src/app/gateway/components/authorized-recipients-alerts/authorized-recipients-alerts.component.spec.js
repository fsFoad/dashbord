import { TestBed } from '@angular/core/testing';
import { AuthorizedRecipientsAlertsComponent } from './authorized-recipients-alerts.component';
describe('AuthorizedRecipientsAlertsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuthorizedRecipientsAlertsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AuthorizedRecipientsAlertsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
