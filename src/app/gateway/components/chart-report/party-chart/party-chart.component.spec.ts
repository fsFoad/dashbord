import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyChartComponent } from './party-chart.component';

describe('PartyChartComponent', () => {
  let component: PartyChartComponent;
  let fixture: ComponentFixture<PartyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
