import { TestBed } from '@angular/core/testing';

import { TaskValidationService } from './task-validation.service';

describe('TaskValidationService', () => {
  let service: TaskValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
