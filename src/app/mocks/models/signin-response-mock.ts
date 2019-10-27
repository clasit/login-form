import {SigninResponseModel} from '../../shared/modules/authentication/models/response/signin-response.model';
import {User} from '../../shared/modules/authentication/models/user.model';

export class SigninResponseMock {

  private signinResponse: SigninResponseModel;

  constructor(data: User) {
    this.signinResponse = new SigninResponseModel();
    this.signinResponse.data = data;
  }

  get success(): SigninResponseModel {
    this.signinResponse.success = true;
    return this.signinResponse;
  }

  get error(): SigninResponseModel {
    this.signinResponse.success = false;
    this.signinResponse.errors = ['Credenciales no validas.'];
    return this.signinResponse;
  }
}
