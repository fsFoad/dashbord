import { TestBed } from '@angular/core/testing';
import { ClientUpdateComponent } from './client-update.component';
describe('ClientUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClientUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
