import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiHubAttachmentComponent } from './api-hub-attachment.component';

describe('ApiHubAttachmentComponent', () => {
  let component: ApiHubAttachmentComponent;
  let fixture: ComponentFixture<ApiHubAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiHubAttachmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiHubAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
