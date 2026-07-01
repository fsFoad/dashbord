import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsProgressSpinnerComponent } from './fs-progress-spinner.component';

describe('FsProgressSpinnerComponent', () => {
  let component: FsProgressSpinnerComponent;
  let fixture: ComponentFixture<FsProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsProgressSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
