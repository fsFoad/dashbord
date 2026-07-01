import { TestBed } from '@angular/core/testing';
import { SequenceComponent } from './sequence.component';
describe('SequenceComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SequenceComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SequenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
