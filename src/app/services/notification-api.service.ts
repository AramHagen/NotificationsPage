import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc, doc,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  writeBatch
} from '@angular/fire/firestore';
import { Notification } from '../models/notification.model';
import { Observable, forkJoin, from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  private notificationsCollection = collection(this.firestore, 'notifications');
  constructor(private firestore: Firestore) { }

  // Create
  async addItem(item: any): Promise<void> {
    const collectionRef = collection(this.firestore, 'items');
    await addDoc(collectionRef, item);
  }
  // Create a new notification document
  addNotification(notification: Notification): Observable<void> {
    return from(addDoc(this.notificationsCollection, notification)).pipe(
      map(() => { }),
      catchError(error => {
        console.error('Error adding document:', error);
        throw error;
      })
    );
  }

  // Get a single notification by ID
  getNotification(id: string): Observable<Notification | null> {
    const notificationDocRef = doc(this.firestore, 'notifications', id);
    return from(getDoc(notificationDocRef)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          return docSnap.data() as Notification;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error getting document:', error);
        throw error;
      })
    );
  }
  // Get all notifications
  getAllNotifications(): Observable<Notification[]> {
    return from(getDocs(this.notificationsCollection)).pipe(
      map(querySnapshot =>
        querySnapshot.docs.map(doc => ({
          ...doc.data(), // Spread document data
          id: doc.id // Manually add `id` from the document reference
        }) as Notification)
      ),
      catchError(error => {
        console.error('Error getting documents:', error);
        throw error;
      })
    );
  }

  // Update any properties of a notification by its ID
  updateNotification(id: string, updates: Partial<Notification>): Observable<void> {
    const notificationDocRef = doc(this.firestore, 'notifications', id);
    return from(updateDoc(notificationDocRef, updates)).pipe(
      map(() => { }),
      catchError(error => {
        console.error('Error updating document:', error);
        throw error;
      })
    );
  }
  // Update all properties for all notifications
  updateAllNotifications(): Observable<void> {
    const batch = writeBatch(this.firestore);
    const notificationsRef = collection(this.firestore, 'notifications');

    return from(getDocs(notificationsRef)).pipe(
      mergeMap(snapshot => {
        // Iterate through each document in the snapshot
        snapshot.forEach(docSnapshot => {
          const notificationDocRef = doc(this.firestore, 'notifications', docSnapshot.id);

          // Fetch the full document data to retain all properties
          const notificationDoc = docSnapshot.data() as Notification;

          // Update the document with the same properties (or modify as needed)
          batch.update(notificationDocRef, { ...notificationDoc, unread: false });

          // If you need to modify other properties, you can do that in the batch update:
          // For example, if you want to reset some specific properties (like 'message')
          // batch.update(notificationDocRef, { unread: false, message: "Updated message" });
        });

        // Commit the batch operation to apply all updates
        return from(batch.commit()).pipe(
          map(() => { }), // Return an empty observable on success
          catchError(error => {
            console.error('Error updating documents:', error);
            throw error;
          })
        );
      })
    );
  }
  // Delete a notification by ID
  deleteNotification(id: string): Observable<void> {
    const notificationDocRef = doc(this.firestore, 'notifications', id);
    return from(deleteDoc(notificationDocRef)).pipe(
      map(() => { }),
      catchError(error => {
        console.error('Error deleting document:', error);
        throw error;
      })
    );
  }

  // Delete all documents in the collection and reinitialize with predefined notifications
  initializeDocument(): Observable<void> {
    // Step 1: Delete all documents from the notifications collection
    const deleteNotifications$: Observable<void>[] = [];

    return from(getDocs(this.notificationsCollection)).pipe(
      mergeMap(snapshot => {
        snapshot.forEach(docSnapshot => {
          deleteNotifications$.push(from(deleteDoc(doc(this.firestore, 'notifications', docSnapshot.id))));
        });
        // Step 2: Initialize with predefined notifications
        const notificationsWithIds: Notification[] = [
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

        // Use `setDoc` with explicit IDs
        const addObservables = notificationsWithIds.map((notification, index) =>
          from(setDoc(doc(this.firestore, 'notifications', notification.id), notification)).pipe(
            catchError(error => {
              console.error("Error adding document: ", error); throw error;
            }),
            map(() => { }),  // Transform to void
          )
        );

        // Use forkJoin to wait for all operations to complete
        return forkJoin([...deleteNotifications$, ...addObservables]).pipe(
          map(() => { }),  // Transform to void
        );
      })
    );
  }

  markAllAsRead(id?: string): Observable<Notification[]> {
    // Use switchMap to chain the getAllNotifications Observable with the update logic
    return this.getAllNotifications().pipe(
      switchMap(notifications => {
        const updateObservables = notifications.map(notification => {
          if (notification.unread) {
            if (id && notification.id === id) {
              // If an ID is provided and the notification matches the ID, update that notification
              const updatedNotification = { ...notification, unread: false };
              return this.updateNotification(id, updatedNotification).pipe(
                map(() => updatedNotification) // Return the updated notification after the update
              );
            } else if (!id) {
              // If no ID is provided, update all notifications
              const updatedNotification = { ...notification, unread: false };
              return this.updateNotification(notification.id, updatedNotification).pipe(
                map(() => updatedNotification) // Return the updated notification after the update
              );
            }
          }
          // If no update is needed, return unchanged notification
          return of(notification);
        });

        // Use forkJoin to wait for all update observables to complete
        return forkJoin(updateObservables);
      })
    );
  }
}



