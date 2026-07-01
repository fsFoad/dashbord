import { TestBed } from '@angular/core/testing';
import { ApisCacheComponent } from './apis-cache.component';
describe('ApisCacheComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApisCacheComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ApisCacheComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
