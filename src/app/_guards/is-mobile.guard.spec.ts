import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { IsMobileGuard } from './is-mobile.guard';

describe('IsMobileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsMobileGuard]
    });
  });

  it('should ...', inject([IsMobileGuard], (guard: IsMobileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
