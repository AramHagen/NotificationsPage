import { TestBed } from '@angular/core/testing';

import { NotificationFecadeService } from './notification-fecade.service';

describe('NotificationFecadeService', () => {
  let service: NotificationFecadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFecadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
