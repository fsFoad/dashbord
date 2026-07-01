import { TestBed } from '@angular/core/testing';
import { IpLimitationComponent } from './ip-limitation.component';
describe('IpLimitationComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IpLimitationComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(IpLimitationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
