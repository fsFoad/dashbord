import { TestBed } from '@angular/core/testing';
import { ClientApiRegisterComponent } from './client-api-register.component';
describe('ClientApiRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientApiRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClientApiRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
