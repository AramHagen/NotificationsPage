import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule, TimeAgoPipe],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss'
})
export class NotificationsListComponent {
  @Input() notifications: Notification[] = [];

  trackByFn(index: number, item:Notification): string {
    return item?.id!;
  }
}
