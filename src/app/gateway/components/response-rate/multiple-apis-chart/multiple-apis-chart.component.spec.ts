import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleApisChartComponent } from './multiple-apis-chart.component';

describe('MultipleApisChartComponent', () => {
  let component: MultipleApisChartComponent;
  let fixture: ComponentFixture<MultipleApisChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleApisChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleApisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
