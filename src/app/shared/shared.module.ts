import {NgModule} from '@angular/core';
import {MatFormFieldModule, MatGridListModule, MatInputModule, MatCardModule, MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthenticationInterceptor} from '../mocks/backend-respose/authentication';

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
  MatDialogModule
];

@NgModule({
  imports: [
    ...Core,
    ...Materials
  ],
  exports: [
    ...Core,
    ...Materials
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ]
})
export class SharedModule {
}
