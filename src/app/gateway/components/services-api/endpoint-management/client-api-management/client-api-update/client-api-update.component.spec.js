import { TestBed } from '@angular/core/testing';
import { ClientApiUpdateComponent } from './client-api-update.component';
describe('ClientApiUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientApiUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClientApiUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
