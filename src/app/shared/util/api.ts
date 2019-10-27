import {environment as env} from '../../../environments/environment';

export const apiCall = (service: string): string => {
  return `${env.baseUrl}${service}`;
};
