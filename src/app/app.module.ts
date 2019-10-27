import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileComponent} from './pages/restricted/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthenticationModule} from './shared/modules/authentication/authentication.module';
import {NavigationBarComponent} from './shared/modules/navigation/navigation-bar/navigation-bar.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const PageComponents = [
  HomeComponent,
  SignupComponent,
  ProfileComponent,
  NavigationBarComponent
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
        deps: [HttpClient]
      }
    }),
    ...UIModules
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
