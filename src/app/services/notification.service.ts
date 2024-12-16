import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  DocumentData,
  collectionData,
  deleteDoc, doc, setDoc
} from '@angular/fire/firestore';
import { Notification } from '../models/notification.model';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsCollection = collection(this.firestore, 'notifications');

  constructor(private firestore: Firestore) {}

  // Add multiple notifications to Firestore
  addNotifications(): Observable<void[]> {
    const notifications: Notification[] = [
            {
        id: "1",
        firstName: "Mark",
        lastName: "Webber",
        avatar: "assets/images/avatar-mark-webber.webp",
        date: new Date("2024-02-06T07:20:00.000Z"),
        message: "",
        type: "recentPostReact",
        groupName: "",
        postTitle: "My first tournament today!",
        unread: true,
        postedImage: ""
      },
      {
        id: "2",
        firstName: "Angela",
        lastName: "Gray",
        avatar: "assets/images/avatar-angela-gray.webp",
        date: new Date("2024-01-30T20:30:00.000Z"),
        message: "",
        type: "follow",
        groupName: "",
        postTitle: "",
        unread: true,
        postedImage: ""
      },
      {
        id: "3",
        firstName: "Jacob",
        lastName: "Thompson",
        avatar: "assets/images/avatar-jacob-thompson.webp",
        date: new Date("2024-01-22T20:30:00.000Z"),
        message: "",
        type: "joinGroup",
        groupName: "Chess Club",
        postTitle: "",
        unread: true,
        postedImage: ""
      },
      {
        id: "4",
        firstName: "Rizky",
        lastName: "Hasanuddin",
        avatar: "assets/images/avatar-rizky-hasanuddin.webp",
        date: new Date("2024-01-22T20:30:00.000Z"),
        message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
        type: "sendMessage",
        groupName: "",
        postTitle: "",
        unread: false,
        postedImage: ""
      },
      {
        id: "5",
        firstName: "Kimberly",
        lastName: "Smith",
        avatar: "assets/images/avatar-kimberly-smith.webp",
        date: new Date("2024-01-01T20:30:00.000Z"),
        message: "",
        type: "comment",
        groupName: "",
        postTitle: "",
        unread: false,
        postedImage: "assets/images/image-chess.webp"
      },
      {
        id: "6",
        firstName: "Nathan",
        lastName: "Peterson",
        avatar: "assets/images/avatar-nathan-peterson.webp",
        date: new Date("2023-12-01T20:30:00.000Z"),
        message: "",
        type: "recentPostReact",
        groupName: "",
        postTitle: "5 end-game strategies to increase your win rate",
        unread: false,
        postedImage: ""
      },
      {
        id: "7",
        firstName: "Anna",
        lastName: "Kim",
        avatar: "assets/images/avatar-anna-kim.webp",
        date: new Date("2023-01-22T20:30:00.000Z"),
        message: "",
        type: "leftGroup",
        groupName: "Chess Club",
        postTitle: "",
        unread: false,
        postedImage: ""
      }
    ];

    const addObservables = notifications.map(notification =>
      from(addDoc(this.notificationsCollection, notification)).pipe(
        catchError(error => {
          console.error("Error adding document: ", error);
          throw error;
        })
      )
    );

    return from(Promise.all(addObservables));
  }

  // Get all notifications
  getAllNotifications(): Observable<Notification[]> {
    return collectionData(this.notificationsCollection, { idField: 'id' });
  }



  resetData(newData: Item[]): Observable<void> {
    return new Observable<void>((observer) => {
      // Step 1: Delete all documents in the collection
      this.itemsCollection.get().subscribe(snapshot => {
        const batch = this.afs.firestore.batch();
        snapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        batch.commit().then(() => {
          // Step 2: Add new data after deletion is complete
          const addOperations = newData.map(data => this.itemsCollection.add(data));
          Promise.all(addOperations)
            .then(() => {
              observer.next();
              observer.complete();
            })
            .catch(error => observer.error(error));
        }).catch(error => observer.error(error));
      });
    });
  }
  

}



// import { Injectable } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   addDoc,
//   CollectionReference,
//   DocumentData,
//   collectionData,
//   deleteDoc, doc, setDoc
// } from '@angular/fire/firestore';
// import { Notification } from '../models/notification.model';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class NotificationService {
//   private notificationsCollection = this.firestore.collection<Notification>('notifications');
//
//   constructor(private firestore: Firestore) {
//     this.notificationsCollection = collection(this.firestore, 'notifications');
//   }
//
//   // Add multiple notifications to Firestore
//   addNotifications() {
//     const notifications: Notification[] = [
//       {
//         id: "1",
//         firstName: "Mark",
//         lastName: "Webber",
//         avatar: "assets/images/avatar-mark-webber.webp",
//         date: new Date("2024-02-06T07:20:00.000Z"),
//         message: "",
//         type: "recentPostReact",
//         groupName: "",
//         postTitle: "My first tournament today!",
//         unread: true,
//         postedImage: ""
//       },
//       {
//         id: "2",
//         firstName: "Angela",
//         lastName: "Gray",
//         avatar: "assets/images/avatar-angela-gray.webp",
//         date: new Date("2024-01-30T20:30:00.000Z"),
//         message: "",
//         type: "follow",
//         groupName: "",
//         postTitle: "",
//         unread: true,
//         postedImage: ""
//       },
//       {
//         id: "3",
//         firstName: "Jacob",
//         lastName: "Thompson",
//         avatar: "assets/images/avatar-jacob-thompson.webp",
//         date: new Date("2024-01-22T20:30:00.000Z"),
//         message: "",
//         type: "joinGroup",
//         groupName: "Chess Club",
//         postTitle: "",
//         unread: true,
//         postedImage: ""
//       },
//       {
//         id: "4",
//         firstName: "Rizky",
//         lastName: "Hasanuddin",
//         avatar: "assets/images/avatar-rizky-hasanuddin.webp",
//         date: new Date("2024-01-22T20:30:00.000Z"),
//         message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
//         type: "sendMessage",
//         groupName: "",
//         postTitle: "",
//         unread: false,
//         postedImage: ""
//       },
//       {
//         id: "5",
//         firstName: "Kimberly",
//         lastName: "Smith",
//         avatar: "assets/images/avatar-kimberly-smith.webp",
//         date: new Date("2024-01-01T20:30:00.000Z"),
//         message: "",
//         type: "comment",
//         groupName: "",
//         postTitle: "",
//         unread: false,
//         postedImage: "assets/images/image-chess.webp"
//       },
//       {
//         id: "6",
//         firstName: "Nathan",
//         lastName: "Peterson",
//         avatar: "assets/images/avatar-nathan-peterson.webp",
//         date: new Date("2023-12-01T20:30:00.000Z"),
//         message: "",
//         type: "recentPostReact",
//         groupName: "",
//         postTitle: "5 end-game strategies to increase your win rate",
//         unread: false,
//         postedImage: ""
//       },
//       {
//         id: "7",
//         firstName: "Anna",
//         lastName: "Kim",
//         avatar: "assets/images/avatar-anna-kim.webp",
//         date: new Date("2023-01-22T20:30:00.000Z"),
//         message: "",
//         type: "leftGroup",
//         groupName: "Chess Club",
//         postTitle: "",
//         unread: false,
//         postedImage: ""
//       }
//     ];
//
//     notifications.forEach(notification => {
//       addDoc(this.notificationsCollection, notification)
//         .then(docRef => console.log("Document written with ID: ", docRef.id))
//         .catch(error => console.error("Error adding document: ", error));
//     });
//   }
//
//   // Get all notifications
//   getAllNotifications(): Observable<Notification[]> {
//     return this.notificationsCollection.valueChanges({ idField: 'id' });
//   }
//
//   // Add a new notification
//   addNotification(notification: Notification): Promise<void> {
//     return addDoc(this.notificationsCollection, notification).then(() => {});
//   }
//
//   // Update a notification
//   updateNotification(id: string, notification: Notification): Promise<void> {
//     const docRef = doc(this.firestore, `notifications/${id}`);
//     return setDoc(docRef, notification, { merge: true });
//   }
//
//   // Delete a notification
//   deleteNotification(id: string): Promise<void> {
//     const docRef = doc(this.firestore, `notifications/${id}`);
//     return deleteDoc(docRef);
//   }
// }
