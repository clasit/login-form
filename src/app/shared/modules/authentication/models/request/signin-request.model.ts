import {ApiRequestModel} from '../../../../models/api-request.model';
import {User} from '../user.model';

export class SigninRequestModel extends ApiRequestModel {
  user: User;
}
