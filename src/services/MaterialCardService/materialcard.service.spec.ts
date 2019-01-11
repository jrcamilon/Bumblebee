/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MaterialcardService } from './materialcard.service';

describe('Service: Materialcard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialcardService]
    });
  });

  it('should ...', inject([MaterialcardService], (service: MaterialcardService) => {
    expect(service).toBeTruthy();
  }));
});
