// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheApiComponent } from './cache-api.component';

describe('CacheApiComponent', () => {
  let component: CacheApiComponent;
  let fixture: ComponentFixture<CacheApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacheApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacheApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
