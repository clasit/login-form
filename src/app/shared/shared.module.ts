import {NgModule} from '@angular/core';
import {
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthenticationInterceptor} from '../mocks/backend-respose/authentication';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

const Core = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule
];

const Materials = [
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule
];

@NgModule({
  imports: [
    ...Core,
    ...Materials,
    TranslateModule
  ],
  exports: [
    ...Core,
    ...Materials,
    TranslateModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ]
})
export class SharedModule {
}
