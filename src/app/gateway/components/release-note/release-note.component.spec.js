import { TestBed } from '@angular/core/testing';
import { ReleaseNoteComponent } from './release-note.component';
describe('ReleaseNoteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReleaseNoteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ReleaseNoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
