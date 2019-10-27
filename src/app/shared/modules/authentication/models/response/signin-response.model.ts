import {ApiResponseModel} from '../../../../models/api-response.model';
import {User} from '../user.model';

export class SigninResponseModel extends ApiResponseModel {
  data: User;
}
