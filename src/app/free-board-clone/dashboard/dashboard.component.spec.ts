import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: GridsterDashboardComponent;
  let fixture: ComponentFixture<GridsterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridsterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
