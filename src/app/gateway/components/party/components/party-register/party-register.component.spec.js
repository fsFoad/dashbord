import { TestBed } from '@angular/core/testing';
import { PartyRegisterComponent } from './party-register.component';
describe('PartyRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PartyRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PartyRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
