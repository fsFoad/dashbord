import { TestBed } from '@angular/core/testing';
import { AlertAccessLevelComponent } from './alert-access-level.component';
describe('AlertAccessLevelComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertAccessLevelComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AlertAccessLevelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
