import { TestBed } from '@angular/core/testing';

import { PresentToastService } from './present-toast.service';

describe('PresentToastService', () => {
  let service: PresentToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
