import { TestBed } from '@angular/core/testing';
import { EndpointUpdateComponent } from './endpoint-update.component';
describe('EndpointUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EndpointUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EndpointUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
