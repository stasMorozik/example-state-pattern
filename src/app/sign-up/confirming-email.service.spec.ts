import { TestBed } from '@angular/core/testing';

import { ConfirmingEmailService } from './confirming-email.service';

describe('ConfirmingEmailService', () => {
  let service: ConfirmingEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmingEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
