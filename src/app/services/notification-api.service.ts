import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, forkJoin, from, switchMap, map} from 'rxjs';
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
  markAllAsRead(id?:string): Observable<Notification[]> {
    console.log(id)
    // Use switchMap to chain the getAllNotifications Observable with the update logic
    return this.getAllNotifications().pipe(
      switchMap(notifications => {
        const updateObservables = notifications.map(notification => {
          if (notification.unread) {
            // If an ID is provided and the notification matches the ID, set unread to false for that notification
            if (id && notification.id === id) {
              const updatedNotification = { ...notification, unread: false };
              return this.http.put<Notification>(`${this.url}/${notification.id}`, updatedNotification);
            }
            // If no ID is provided, or the notification doesn't match the ID, set unread to false for all
            else if (!id) {
              const updatedNotification = { ...notification, unread: false };
              return this.http.put<Notification>(`${this.url}/${notification.id}`, updatedNotification);
            }
            // If no update is needed, return unchanged notification
            else {
              return from([notification]);
            }
          } else {
            // If the notification is already read, just return it unchanged
            return from([notification]);
          }
        });
        console.log(updateObservables)
        return forkJoin(updateObservables); // Use forkJoin to wait for all observables
      })
    );
  }
  initiateDbJson(data:Notification[]):Notification[] {
    for(let i=0;i<3;i++){
      const updatedNotification = { ...data[i], unread: true };
      this.http.put<Notification>(`${this.url}/${data[i].id}`, updatedNotification).subscribe();
    }
    return data;
  }
}
