import { ResponseBase } from './types';
import ObjectsBase from './base';

// TODO: which of these can be null?
export interface Account {
  id: number;
  company: string;
  level: string;
  website: string;
  vanity_domain: string;
  plugin_campaign_id: number;
  tracking_code_template: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  territory: string | null;
  zip: number | null;
  country: number | string | null; // should be a string, but in my test account the value is 0
  phone: string | null;
  fax: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountResponse extends ResponseBase {
  account: Account;
}

export default class Accounts extends ObjectsBase {
  objectName = 'account';

  public async read(): Promise<AccountResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'read');

    const response = await this.parent.axios.get<AccountResponse>(url);

    return response.data;
  }
}
