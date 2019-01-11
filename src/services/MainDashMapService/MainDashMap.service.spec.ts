/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainDashMapService } from './MainDashMap.service';

describe('Service: MainDashMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainDashMapService]
    });
  });

  it('should ...', inject([MainDashMapService], (service: MainDashMapService) => {
    expect(service).toBeTruthy();
  }));
});
