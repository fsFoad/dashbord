import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredNodeComponent } from './required-node.component';

describe('RequiredNodeComponent', () => {
  let component: RequiredNodeComponent;
  let fixture: ComponentFixture<RequiredNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
