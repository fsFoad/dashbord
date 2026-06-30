import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatorsJsonComponent } from './mediators-json.component';

describe('MediatorsJsonComponent', () => {
  let component: MediatorsJsonComponent;
  let fixture: ComponentFixture<MediatorsJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediatorsJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediatorsJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
