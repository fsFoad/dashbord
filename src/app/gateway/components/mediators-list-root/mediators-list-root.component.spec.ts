import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatorsListRootComponent } from './mediators-list-root.component';

describe('MediatorsListRootComponent', () => {
  let component: MediatorsListRootComponent;
  let fixture: ComponentFixture<MediatorsListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediatorsListRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediatorsListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
