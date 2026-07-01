import { TestBed } from '@angular/core/testing';
import { BillStoreCartableComponent } from './bill-store-cartable.component';
describe('BillStoreCartableComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BillStoreCartableComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(BillStoreCartableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
