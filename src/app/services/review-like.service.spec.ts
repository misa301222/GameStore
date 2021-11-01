import { TestBed } from '@angular/core/testing';

import { ReviewLikeService } from './review-like.service';

describe('ReviewLikeService', () => {
  let service: ReviewLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
