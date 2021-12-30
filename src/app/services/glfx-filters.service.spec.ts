import { TestBed } from '@angular/core/testing';

import { GlfxFiltersService } from './glfx-filters.service';

describe('GlfxFiltersService', () => {
  let service: GlfxFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlfxFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
