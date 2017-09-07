import { TestBed, inject } from '@angular/core/testing';

import { InquireItemsSummaryService } from './inquire-items-summary.service';

describe('InquireItemsSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InquireItemsSummaryService]
    });
  });

  it('should be created', inject([InquireItemsSummaryService], (service: InquireItemsSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
