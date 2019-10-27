import {NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import {SharedModule} from '../../shared.module';
import {AuthGuardService} from './services/auth-guard.service';
import {FormLoginComponent} from './components/form-login/form-login.component';
import {FormSignupComponent} from './components/form-signup/form-signup.component';
import {FormValidationComponent} from './components/form-validation/form-validation.component';

@NgModule({
  declarations: [
    FormLoginComponent,
    FormSignupComponent,
    FormValidationComponent
  ],
  entryComponents: [
    FormValidationComponent
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FormLoginComponent,
    FormSignupComponent,
    FormValidationComponent,
    SharedModule
  ]
})
export class AuthenticationModule {
}
