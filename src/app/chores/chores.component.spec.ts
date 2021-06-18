import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChoresComponent } from './chores.component';

describe('ChoresComponent', () => {
  let component: ChoresComponent;
  let fixture: ComponentFixture<ChoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
