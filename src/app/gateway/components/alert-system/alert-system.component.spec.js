import { TestBed } from '@angular/core/testing';
import { AlertSystemComponent } from './alert-system.component';
describe('AlertSystemComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AlertSystemComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AlertSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
