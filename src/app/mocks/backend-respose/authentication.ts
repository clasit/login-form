import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {User} from '../../shared/modules/authentication/models/user.model';
import {AuthInfo} from '../../shared/modules/authentication/services/auth.service';
import {SignupResponseMock} from '../models/signup-response-mock';
import {SigninResponseMock} from '../models/signin-response-mock';
import {HttpHeadersMock} from '../models/http-headers-mock';
import {environment as env} from '../../../environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private request: HttpRequest<any>;
  private readonly validationCode = '1234';
  private readonly tokenValue = 'fake-token';

  private get users(): User[] {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  private get user(): User {
    return this.request.body.user;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.request = request;

    return of(null)
      .pipe(
        mergeMap(() => {
          if (this.request.url.includes('mock')) {
            if (this.isSignUpRequest()) {
              return this.signUpResponse();
            }
            if (this.isSignInRequest()) {
              return this.signInResponse();
            }
            if (this.isSignInVerifyCodeRequest()) {
              return this.signInVerifyCodeResponse();
            }
            if (this.isValidateTokenRequest()) {
              return this.validateTokenResponse();
            }
          }
          return next.handle(this.request);
        }));
  }

  private isSignUpRequest(): boolean {
    return this.request.method === 'POST' &&
      this.request.url.includes(env.service.signUp);
  }

  private isSignInRequest(): boolean {
    return this.request.method === 'POST' &&
      this.request.url.includes(env.service.signIn);
  }

  private isSignInVerifyCodeRequest(): boolean {
    return this.request.method === 'POST' &&
      this.request.url.includes(env.service.verifyCode);
  }

  private isValidateTokenRequest(): boolean {
    return this.request.method === 'GET' &&
      this.request.url.includes(env.service.validateToken);
  }

  public signUpResponse() {
    const user = this.storeUser(this.user);
    const response = new SignupResponseMock(user);
    return of(new HttpResponse<any>({
      status: 200,
      body: response.success
    }));
  }

  public signInResponse() {
    const user = this.loggedUser;
    const response = new SigninResponseMock(user);
    const header = new HttpHeadersMock(user);
    if (user) {
      return of(new HttpResponse<any>({
        headers: header.authentication(),
        status: 200,
        body: response.success
      }));
    } else {
      return of(new HttpResponse<any>({
        status: 401,
        body: response.error
      }));
    }
  }

  public signInVerifyCodeResponse() {
    const user = this.loggedUser;
    const response = new SigninResponseMock(this.loggedUser);
    const header = new HttpHeadersMock(user, this.tokenValue);
    if (user && this.isCodeCorrect) {
      return of(new HttpResponse<any>({
        headers: header.authentication(),
        status: 200,
        body: response.success
      }));
    } else {
      return of(new HttpResponse<any>({
        status: 401,
        body: response.error
      }));
    }
  }

  public validateTokenResponse() {
    const user = this.authUser;
    const response = new SigninResponseMock(user);
    const header = new HttpHeadersMock(user);
    if (user) {
      return of(new HttpResponse<any>({
        headers: header.authentication(),
        status: 200,
        body: response.success
      }));
    } else {
      return of(new HttpResponse<any>({
        status: 401,
        body: response.error
      }));
    }
  }

  private get authUser() {
    const uid = this.request.headers.get(AuthInfo.uid);
    const authUser = this.users.find((user) => user.email === uid);
    const tokenHeader = this.request.headers.get(AuthInfo.accessToken);
    if (authUser && (tokenHeader === this.tokenValue)) {
      return authUser;
    } else {
      return undefined;
    }
  }

  private get loggedUser(): User {
    return this.users.find(
      (user) =>
        user.email === this.user.email
        && user.password === this.user.password);
  }

  private get isCodeCorrect(): boolean {
    return this.user.verificationCode === this.validationCode;
  }

  private storeUser(user: User): User {
    const newUser: User = {
      id: this.users.length + 1,
      email: user.email,
      name: user.name,
      phone: user.phone,
      password: user.password
    };
    const users = this.users;
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }
}
