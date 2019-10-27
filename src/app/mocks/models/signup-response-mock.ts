import {SignupResponseModel} from '../../shared/modules/authentication/models/response/signup-response.model';
import {User} from '../../shared/modules/authentication/models/user.model';

export class SignupResponseMock {

  private signinResponse: SignupResponseModel;

  constructor(data: User) {
    this.signinResponse = new SignupResponseModel();
    this.signinResponse.data = data;
  }

  get success(): SignupResponseModel {
    this.signinResponse.success = true;
    return this.signinResponse;
  }

  get error(): SignupResponseModel {
    this.signinResponse.success = false;
    this.signinResponse.errors = ['Invalid register.'];
    return this.signinResponse;
  }
}
