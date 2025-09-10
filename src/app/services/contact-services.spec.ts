import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact-services';

describe('ContactServices', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
