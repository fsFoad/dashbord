import { TestBed } from '@angular/core/testing';
import { RegisterHubComponent } from './register-hub.component';
describe('ApiHubComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterHubComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegisterHubComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
