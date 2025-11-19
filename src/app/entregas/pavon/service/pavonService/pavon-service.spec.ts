import { TestBed } from '@angular/core/testing';

import { PavonService } from './pavon-service';

describe('PavonService', () => {
  let service: PavonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PavonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
