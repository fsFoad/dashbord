import { TestBed } from '@angular/core/testing';
import { MediatorsListComponent } from './mediators-list.component';
describe('MediatorsListComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MediatorsListComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MediatorsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
