import { TestBed, inject } from '@angular/core/testing';

import { IteracionService } from './iteracion.service';

describe('IteracionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IteracionService]
    });
  });

  it('should be created', inject([IteracionService], (service: IteracionService) => {
    expect(service).toBeTruthy();
  }));
});
