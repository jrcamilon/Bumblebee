/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnlineServiceService } from './online-service.service';

describe('Service: OnlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineServiceService]
    });
  });

  it('should ...', inject([OnlineServiceService], (service: OnlineServiceService) => {
    expect(service).toBeTruthy();
  }));
});
