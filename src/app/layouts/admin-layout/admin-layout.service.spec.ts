import { TestBed } from '@angular/core/testing';

import { AdminLayoutService } from './admin-layout.service';

describe('AdminLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminLayoutService = TestBed.get(AdminLayoutService);
    expect(service).toBeTruthy();
  });
});
