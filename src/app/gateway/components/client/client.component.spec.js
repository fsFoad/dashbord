import { TestBed } from '@angular/core/testing';
import { ClientComponent } from './client.component';
describe('ClientComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
