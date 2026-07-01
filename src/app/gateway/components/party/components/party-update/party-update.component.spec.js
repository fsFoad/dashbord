import { TestBed } from '@angular/core/testing';
import { PartyUpdateComponent } from './party-update.component';
describe('PartyUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PartyUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PartyUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
