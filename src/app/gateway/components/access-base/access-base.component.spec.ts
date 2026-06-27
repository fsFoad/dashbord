import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessBaseComponent } from './access-base.component';

describe('AccessBaseComponent', () => {
  let component: AccessBaseComponent;
  let fixture: ComponentFixture<AccessBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
