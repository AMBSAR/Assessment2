import { TestBed } from '@angular/core/testing';

import { UserAuthenticatorService } from './user-authenticator.service';

describe('UserAuthenticatorService', () => {
  let service: UserAuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
