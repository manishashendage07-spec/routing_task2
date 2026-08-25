import { TestBed } from '@angular/core/testing';

import { NewUsersResolverService } from './new-users.resolver.service';

describe('NewUsersResolverService', () => {
  let service: NewUsersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewUsersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
