/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KhppFormService } from './Khpp-Form.service';

describe('Service: KhppForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KhppFormService]
    });
  });

  it('should ...', inject([KhppFormService], (service: KhppFormService) => {
    expect(service).toBeTruthy();
  }));
});
