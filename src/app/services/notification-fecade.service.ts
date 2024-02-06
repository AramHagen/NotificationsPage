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
      console.log('miad?');
      this.notificationApiService.getAllNotifications().subscribe((notifications)=>{
        this.notificationStatusService.setNotifications(notifications)
      })
    // return this.notificationApiService.getAllNotifications().pipe(tap(notifications => this.notificationStatusService.setNotifications(notifications)))
    }
    markAllAsRead(){
      this.notificationApiService.markAllAsRead().pipe(tap(notifications => this.notificationStatusService.setNotifications(notifications)))
  
    }
}
