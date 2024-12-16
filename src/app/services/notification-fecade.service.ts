import { Injectable } from '@angular/core';
import { NotificationApiService } from './notification-api.service';
import { Observable, switchMap, tap } from 'rxjs';
import { NotificationStatusService } from './notification-state.service';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationFecadeService {

  constructor(private notificationApiService: NotificationApiService,
    private notificationStatusService: NotificationStatusService,) { }

  getNotifications$(): Observable<Notification[]> {
    return this.notificationStatusService.getNotifictions$();
  }
  loadNotifications() {
    this.initiateFireBase().pipe(
      switchMap(() => {
        // After initializing Firebase, call getAllNotifications
        return this.notificationApiService.getAllNotifications();
      })
    ).subscribe((notifications) => {
      this.notificationStatusService.setNotifications(notifications);
    });
  }

  getUnreadCount$(): Observable<number> {
    return this.notificationStatusService.getUnreadCount$();
  }

  initiateFireBase(): Observable<void> {
    return this.notificationApiService.initializeDocument();
  }
  markAllAsRead(id?: string) {
    this.notificationApiService.markAllAsRead(id).subscribe((notifications) => {
      this.notificationStatusService.setCounter(0);
      this.notificationStatusService.setNotifications(notifications);
    })
  }
}
