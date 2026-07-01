import { TestBed } from '@angular/core/testing';
import { AccessBaseComponent } from './access-base.component';
describe('AccessBaseComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccessBaseComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AccessBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
