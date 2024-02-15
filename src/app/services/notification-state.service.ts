import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationStatusService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private unreadCount$ = new BehaviorSubject<number>(0);
  constructor() { }

  getNotifictions$(){
    return this.notifications$.asObservable();
  }
  setNotifications(notifications: Notification[]){
    this.notifications$.next(notifications);
    this.calculateUnreadItem(notifications);
  }
  getUnreadCount$(){
    return this.unreadCount$.asObservable();
  }
  setCounter(count: number){
    this.unreadCount$.next(count);
  }
  calculateUnreadItem(notifications: Notification[]){
    const count = notifications.filter(x=>x.unread === true).length;
    this.setCounter(count);
  }
}
