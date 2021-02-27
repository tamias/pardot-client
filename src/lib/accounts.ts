import { AccountResponse } from '../types';
import ObjectsBase from './objects-base';

export default class Accounts extends ObjectsBase {
  objectName = 'account';

  public async read(): Promise<AccountResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'read');

    const response = await this.parent.axios.get<AccountResponse>(url);

    return response.data;
  }
}
