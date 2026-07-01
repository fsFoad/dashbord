import { TestBed } from '@angular/core/testing';
import { InputMediatorComponent } from './input-mediator.component';
describe('InputMediatorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputMediatorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(InputMediatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
