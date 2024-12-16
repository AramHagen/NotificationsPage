import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {environment} from "../environments/environment.firebase";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideNoopAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Initialize Firebase
    provideFirestore(() => getFirestore()) // Import Firestore
  ]
};
