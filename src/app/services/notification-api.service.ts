import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, switchMap } from 'rxjs';
import { Notification } from '../models/notification.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {
 private url = `${environment.baseUrl}/notifications`;
  constructor(private http:HttpClient) { }
  getAllNotifications():Observable<Notification[]>{
    return this.http.get<Notification[]>(this.url)
  }
  markAllAsRead(): Observable<Notification[]> {
    // Use switchMap to chain the getAllNotifications Observable with the update logic
    return this.getAllNotifications().pipe(
      switchMap(notifications => {
        const updateObservables = notifications.map(notification => {
          if (notification.unread) {
            const updatedNotification = { ...notification, unread: false };
            return this.http.put<Notification>(`${this.url}/${notification.id}`, updatedNotification);
          } else {
            return from([notification]); // Wrap unchanged notifications into an Observable
          }
        });
        return forkJoin(updateObservables); // Use forkJoin to wait for all observables
      })
    );
  }
}
