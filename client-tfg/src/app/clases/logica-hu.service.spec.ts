import { TestBed, inject } from '@angular/core/testing';

import { LogicaHuService } from './logica-hu.service';

describe('LogicaHuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicaHuService]
    });
  });

  it('should be created', inject([LogicaHuService], (service: LogicaHuService) => {
    expect(service).toBeTruthy();
  }));
});
