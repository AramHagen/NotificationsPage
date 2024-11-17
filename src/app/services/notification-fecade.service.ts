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
        const isUnread = notifications.filter(x=>x.unread);
        if(isUnread.length !==3){
          const data = notifications.map((item, index) => ({...item, unread: index < 3}));
          const newList = this.notificationApiService.initiateDbJson(data);
          this.notificationStatusService.setNotifications(newList);
        }else{
          this.notificationStatusService.setNotifications(notifications);
        }
      })
    }
    markAllAsRead(id?:string){
      this.notificationApiService.markAllAsRead(id).subscribe((notifications)=>{
        this.notificationStatusService.setCounter(0);
        this.notificationStatusService.setNotifications(notifications);
      })
    }
    getUnreadCount$():Observable<number>{
      return this.notificationStatusService.getUnreadCount$();
    }
}
