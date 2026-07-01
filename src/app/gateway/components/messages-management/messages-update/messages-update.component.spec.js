import { TestBed } from '@angular/core/testing';
import { MessagesUpdateComponent } from './messages-update.component';
describe('MessagesUpdateComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessagesUpdateComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MessagesUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
