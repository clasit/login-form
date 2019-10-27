import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileComponent} from './pages/restricted/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthenticationModule} from './shared/modules/authentication/authentication.module';

const PageComponents = [
  HomeComponent,
  SignupComponent,
  ProfileComponent
];

const UIModules = [
  AuthenticationModule
];

@NgModule({
  declarations: [
    AppComponent,
    ...PageComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...UIModules
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
