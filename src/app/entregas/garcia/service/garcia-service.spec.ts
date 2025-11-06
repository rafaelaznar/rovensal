import { TestBed } from '@angular/core/testing';

import { GarciaService } from './garcia-service';

describe('GarciaService', () => {
  let service: GarciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
