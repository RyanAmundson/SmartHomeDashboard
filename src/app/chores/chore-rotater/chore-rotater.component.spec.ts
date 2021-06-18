import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChoreRotaterComponent } from './chore-rotater.component';

describe('ChoreRotaterComponent', () => {
  let component: ChoreRotaterComponent;
  let fixture: ComponentFixture<ChoreRotaterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreRotaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreRotaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
