import { TestBed } from '@angular/core/testing';
import { ClientRegisterComponent } from './client-register.component';
describe('ClientRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClientRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
