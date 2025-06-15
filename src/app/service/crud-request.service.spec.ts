import { TestBed } from '@angular/core/testing';

import { CrudRequestService } from './crud-request.service';

describe('CrudRequestService', () => {
  let service: CrudRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
