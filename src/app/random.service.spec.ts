import { TestBed } from '@angular/core/testing';

import { randomService } from './random.service';

describe('randomService', () => {
  let service: randomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(randomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
