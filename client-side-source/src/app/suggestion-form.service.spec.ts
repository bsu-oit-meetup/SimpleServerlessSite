import { TestBed } from '@angular/core/testing';

import { SuggestionFormService } from './suggestion-form.service';

describe('SuggestionFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuggestionFormService = TestBed.get(SuggestionFormService);
    expect(service).toBeTruthy();
  });
});
