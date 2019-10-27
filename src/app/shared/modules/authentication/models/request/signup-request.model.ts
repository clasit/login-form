import {ApiRequestModel} from '../../../../models/api-request.model';
import {User} from '../user.model';

export class SignupRequestModel extends ApiRequestModel {
  user: User;
}
