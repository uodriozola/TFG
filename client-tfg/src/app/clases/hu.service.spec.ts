import { TestBed, inject } from '@angular/core/testing';

import { HuService } from './hu.service';

describe('HuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuService]
    });
  });

  it('should be created', inject([HuService], (service: HuService) => {
    expect(service).toBeTruthy();
  }));
});
