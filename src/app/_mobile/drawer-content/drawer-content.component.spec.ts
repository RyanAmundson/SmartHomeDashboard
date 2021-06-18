import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrawerContentComponent } from './drawer-content.component';

describe('DrawerContentComponent', () => {
  let component: DrawerContentComponent;
  let fixture: ComponentFixture<DrawerContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
