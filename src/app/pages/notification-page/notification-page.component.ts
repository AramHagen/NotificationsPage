import { Component } from '@angular/core';
import { NotificationsListComponent } from "../../components/notifications-list/notifications-list.component";
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-notification-page',
    standalone: true,
    templateUrl: './notification-page.component.html',
    styleUrl: './notification-page.component.scss',
    imports: [NotificationsListComponent,MatButtonModule]
})
export class NotificationPageComponent {

}
