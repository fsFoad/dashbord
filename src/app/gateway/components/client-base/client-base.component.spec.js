import { TestBed } from '@angular/core/testing';
import { ClientBaseComponent } from './client-base.component';
describe('ClientBaseComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientBaseComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClientBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
