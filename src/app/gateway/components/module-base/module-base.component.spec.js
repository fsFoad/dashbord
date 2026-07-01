import { TestBed } from '@angular/core/testing';
import { ModuleBaseComponent } from './module-base.component';
describe('ModuleBaseComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModuleBaseComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ModuleBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
