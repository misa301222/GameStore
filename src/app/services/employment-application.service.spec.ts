import { TestBed } from '@angular/core/testing';

import { EmploymentApplicationService } from './employment-application.service';

describe('EmploymentApplicationService', () => {
  let service: EmploymentApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
