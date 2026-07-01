import { TestBed } from '@angular/core/testing';
import { CacheApiComponent } from './cache-api.component';
describe('CacheApiComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CacheApiComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CacheApiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
