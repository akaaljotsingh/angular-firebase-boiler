import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '@environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    AngularFireAuthModule,
    provideRouter(routes), 
    { 
      provide: AngularFireModule, 
      useValue: AngularFireModule.initializeApp(environment.firebase) 
    }, 
    { 
      provide: FIREBASE_OPTIONS, 
      useValue: environment.firebase 
    },
    provideFirebaseApp(
      () => initializeApp(environment.firebase)),
  ]
};
