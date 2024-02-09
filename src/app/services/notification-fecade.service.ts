import { Injectable } from '@angular/core';
import { NotificationApiService } from './notification-api.service';
import { Observable, tap } from 'rxjs';
import { NotificationStatusService } from './notification-state.service';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationFecadeService {

  constructor(private notificationApiService:NotificationApiService, private notificationStatusService:NotificationStatusService) {}

    getNotifications$(): Observable<Notification[]>{
     return this.notificationStatusService.getNotifictions$();
    }
    loadNotifications(){
      this.notificationApiService.getAllNotifications().subscribe((notifications)=>{
        this.notificationStatusService.setNotifications(notifications)
      })
    }
    markAllAsRead(){
      this.notificationApiService.markAllAsRead().subscribe((notifications)=>{
        this.notificationStatusService.setCounter(0);
        this.notificationStatusService.setNotifications(notifications);
      })
    }
    getUnreadCount$():Observable<number>{
      return this.notificationStatusService.getUnreadCount$();
    }
}
