import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Notification } from '../../models/notification.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule, TimeAgoPipe],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss'
})
export class NotificationsListComponent {
  @Input() notifications: Notification[] = [];
  @Output() onUnread: EventEmitter<string> = new EventEmitter();

  trackByFn(index: number, item:Notification): string {
    return item?.id!;
  }
  onUnreadComment(event: any,notification:Notification){
    event.preventDefault();
    if(event.currentTarget.classList.contains('notification--urRead')){
      event.currentTarget.classList.remove('notification--urRead');
      this.onUnread.emit(notification.id);
    }
  }
}
