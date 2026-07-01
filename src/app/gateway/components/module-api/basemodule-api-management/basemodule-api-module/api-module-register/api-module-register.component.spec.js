import { TestBed } from '@angular/core/testing';
import { ApiModuleRegisterComponent } from './api-module-register.component';
describe('ApiModuleRegisterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiModuleRegisterComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApiModuleRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
