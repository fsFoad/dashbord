import { TestBed } from '@angular/core/testing';
import { HeaderEndpointUpdateComponent } from './header-endpoint-update.component';
describe('HeaderEndpointUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderEndpointUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(HeaderEndpointUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
