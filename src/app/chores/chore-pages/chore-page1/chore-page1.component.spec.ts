import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChorePage1Component } from './chore-page1.component';

describe('ChorePage1Component', () => {
  let component: ChorePage1Component;
  let fixture: ComponentFixture<ChorePage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChorePage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChorePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
