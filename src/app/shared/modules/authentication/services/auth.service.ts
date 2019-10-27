import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {SigninResponseModel} from '../models/response/signin-response.model';
import {SignupResponseModel} from '../models/response/signup-response.model';
import {SigninRequestModel} from '../models/request/signin-request.model';
import {SignupRequestModel} from '../models/request/signup-request.model';
import {environment as env} from '../../../../../environments/environment';
import {apiCall} from '../../../util/api';

export enum AuthInfo {
  uid = 'uid',
  accessToken = 'access-token'
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signUp(credential: User): Observable<SignupResponseModel> {
    const requestBody = new SignupRequestModel();
    requestBody.user = credential;
    return this.http.post<SignupResponseModel>(
      apiCall(env.service.signUp),
      requestBody);
  }

  public signIn(credential: User): Observable<SigninResponseModel> {
    const requestBody = new SigninRequestModel();
    requestBody.user = credential;
    return this.http.post<SigninResponseModel>(
      apiCall(env.service.signIn),
      requestBody);
  }

  public signInVerify(credential: User): Observable<SigninResponseModel> {
    const requestBody = new SigninRequestModel();
    requestBody.user = credential;
    return this.http.post<SigninResponseModel>(
      apiCall(env.service.verifyCode),
      requestBody,
      {observe: 'response'})
      .pipe(map((response) => {
        this.storeCredentials(response);
        return response.body;
      }));
  }

  public validateToken(): Observable<boolean> {
    return this.http.get<SigninResponseModel>(
      apiCall(env.service.validateToken),
      {headers: this.authHeaders()})
      .pipe(map((response) => response.success),
        catchError(() => of(false)));
  }

  private storeCredentials(response: HttpResponse<SigninResponseModel>) {
    if (response.status === 200 && response.body.success) {
      const uid = response.headers.get(AuthInfo.uid);
      localStorage.setItem(AuthInfo.uid, uid);
      const token = response.headers.get(AuthInfo.accessToken);
      localStorage.setItem(AuthInfo.accessToken, token);
    }
  }

  private authHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const uid = localStorage.getItem(AuthInfo.uid);
    headers = headers.set(AuthInfo.uid, uid);
    const token = localStorage.getItem(AuthInfo.accessToken);
    headers = headers.set(AuthInfo.accessToken, token);
    return headers;
  }
}
