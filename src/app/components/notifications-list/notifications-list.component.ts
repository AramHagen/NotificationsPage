import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss'
})
export class NotificationsListComponent {
  @Input() notifications: Notification[] = [];
  constructor() { 
    console.log('this.notifications', this.notifications)
  }
  trackByFn(index: number, item:Notification): string {
    return item?.id!;
  }
}
