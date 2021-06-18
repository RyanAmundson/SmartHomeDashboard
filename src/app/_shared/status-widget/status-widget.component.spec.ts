import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatusWidgetComponent } from './status-widget.component';

describe('StatusWidgetComponent', () => {
  let component: StatusWidgetComponent;
  let fixture: ComponentFixture<StatusWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
