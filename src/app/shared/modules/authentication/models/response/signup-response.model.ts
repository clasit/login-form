import {ApiResponseModel} from '../../../../models/api-response.model';
import {User} from '../user.model';

export class SignupResponseModel extends ApiResponseModel {
  data: User;
}
