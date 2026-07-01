import { TestBed } from '@angular/core/testing';
import { RolesComponent } from './roles.component';
describe('RolesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RolesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RolesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
