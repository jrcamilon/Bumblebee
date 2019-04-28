/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypesService } from './types.service';

describe('Service: Types', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypesService]
    });
  });

  it('should ...', inject([TypesService], (service: TypesService) => {
    expect(service).toBeTruthy();
  }));
});
