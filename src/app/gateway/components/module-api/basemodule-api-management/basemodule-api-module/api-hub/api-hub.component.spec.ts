import { ComponentFixture, TestBed } from '@angular/core/testing';

import { apiHubComponent } from './api-hub.component';

describe('AttachmentHubComponent', () => {
  let component: apiHubComponent;
  let fixture: ComponentFixture<apiHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ apiHubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(apiHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
