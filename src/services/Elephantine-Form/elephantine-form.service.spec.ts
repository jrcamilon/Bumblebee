import { TestBed } from '@angular/core/testing';

import { ElephantineFormService } from './elephantine-form.service';

describe('ElephantineFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElephantineFormService = TestBed.get(ElephantineFormService);
    expect(service).toBeTruthy();
  });
});
