import { TestBed } from '@angular/core/testing';
import { ModuleApiAddComponent } from './module-api-add.component';
describe('ModuleApiAddComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModuleApiAddComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ModuleApiAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
