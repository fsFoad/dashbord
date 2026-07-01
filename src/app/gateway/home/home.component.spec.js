import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { async } from 'rxjs';
describe('HomeComponent', () => {
    let component;
    let fixture;
    // @ts-ignore
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
