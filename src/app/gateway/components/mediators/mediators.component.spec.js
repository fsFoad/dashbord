import { TestBed } from '@angular/core/testing';
import { MediatorsComponent } from './mediators.component';
describe('MediatorsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MediatorsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MediatorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
