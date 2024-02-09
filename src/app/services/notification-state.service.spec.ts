import { TestBed } from '@angular/core/testing';

import { NotificationStatusService } from './notification-state.service';

describe('NotificationStatusService', () => {
  let service: NotificationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
