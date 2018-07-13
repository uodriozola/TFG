import { TestBed, inject } from '@angular/core/testing';

import { ContadorService } from './contador.service';

describe('ContadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContadorService]
    });
  });

  it('should be created', inject([ContadorService], (service: ContadorService) => {
    expect(service).toBeTruthy();
  }));
});
