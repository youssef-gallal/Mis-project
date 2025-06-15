import { TestBed } from '@angular/core/testing';

import { AccLangService } from './acc-lang.service';

describe('AccLangService', () => {
  let service: AccLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
