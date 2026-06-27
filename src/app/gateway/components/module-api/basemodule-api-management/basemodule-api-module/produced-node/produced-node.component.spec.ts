import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedNodeComponent } from './produced-node.component';

describe('ProducedNodeComponent', () => {
  let component: ProducedNodeComponent;
  let fixture: ComponentFixture<ProducedNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducedNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducedNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
