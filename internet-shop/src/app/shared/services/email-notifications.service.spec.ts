import { TestBed } from '@angular/core/testing';

import { EmailNotificationsService } from './email-notifications.service';

describe('EmailNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailNotificationsService = TestBed.get(EmailNotificationsService);
    expect(service).toBeTruthy();
  });
});
