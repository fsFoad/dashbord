import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSelectorComponent } from './message-selector.component';

describe('MessageSelectorComponent', () => {
  let component: MessageSelectorComponent;
  let fixture: ComponentFixture<MessageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
