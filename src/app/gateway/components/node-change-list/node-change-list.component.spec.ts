import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeChangeListComponent } from './node-change-list.component';

describe('NodeChangeListComponent', () => {
  let component: NodeChangeListComponent;
  let fixture: ComponentFixture<NodeChangeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeChangeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeChangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
