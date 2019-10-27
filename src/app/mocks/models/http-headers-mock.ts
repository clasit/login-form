import {HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/modules/authentication/models/user.model';

export class HttpHeadersMock {

  private readonly uid: string;
  private readonly token: string;

  constructor(user?: User, token?: string) {
    this.uid = user && user.email;
    this.token = token;
  }

  public authentication(headers?: HttpHeaders): HttpHeaders {
    headers = headers || new HttpHeaders();
    headers = this.token ? headers.set('access-token', this.token) : headers;
    headers = this.uid ? headers.set('uid', this.uid) : headers;
    headers = headers.set('expiry', this.timestamp);
    return headers;
  }

  private get timestamp(): string {
    return String(Math.floor(Date.now() / 1000) + 600);
  }
}
