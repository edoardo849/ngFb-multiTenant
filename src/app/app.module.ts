import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { AuthService } from './core/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment'
import { LoggerService } from './core/logger/logger.service';
import { ConsoleLoggerService } from './core/logger/console-logger.service';
import { FirestoreService } from './core/firestore.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    AddUserComponent
  ],
  imports: [
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'ngFb-multiTenant'),
    AngularFireStorageModule,

  ],
  providers: [
    AuthService,
    FirestoreService,
    {
      provide: LoggerService,
      useClass: ConsoleLoggerService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
