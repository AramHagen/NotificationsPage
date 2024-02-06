import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationStatusService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  constructor() { }

  getNotifictions$(){
    return this.notifications$.asObservable();
  }
  setNotifications(notifications: Notification[]){
    this.notifications$.next(notifications);
  }
}
