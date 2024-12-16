import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { NotificationsListComponent } from "../../components/notifications-list/notifications-list.component";
import { MatButtonModule } from '@angular/material/button';
import { Notification } from '../../models/notification.model';
import { Observable } from 'rxjs';
import { NotificationFecadeService } from '../../services/notification-fecade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss',
  imports: [NotificationsListComponent, MatButtonModule, CommonModule]
})

export class NotificationPageComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  unreadCounter$: Observable<number>;

  constructor(private notificationFecadeService: NotificationFecadeService) {
    this.notifications$ = this.notificationFecadeService.getNotifications$();
    this.unreadCounter$ = this.notificationFecadeService.getUnreadCount$()
  }

  ngOnInit(): void {
    this.notificationFecadeService.loadNotifications();
  }

  markAllAsRead(event?: any) {
    this.notificationFecadeService.markAllAsRead(event);
  }
}
