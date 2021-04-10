import { CreatedSearchParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';

export interface EmailClick {
  id: number;
  prospect_id: number;
  url: string;
  list_email_id?: number;
  drip_program_action_id?: number;
  email_template_id?: number;
  tracker_redirect_id?: number;
  created_at: string;
}

// TODO: API doc lists id_greater_than but not id_less_than for email clicks
// Is that accurate or an oversight?
type EmailClickSearchParams = {
  list_email_id?: number;
  drip_program_action_id?: number;
  email_template_id?: number;
  tracker_redirect_id?: number;
} & IdSearchParams &
  CreatedSearchParams;

// does the API really not accept 'offset' when querying email clicks?
interface EmailClickResultParams {
  limit?: number;
}

type EmailClickQueryParams = EmailClickSearchParams & EmailClickResultParams;

export interface EmailClickQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    emailClick?: EmailClick | EmailClick[];
  };
}

export default class EmailClicks extends ObjectsBase {
  objectName = 'emailClick';

  public async query(params?: EmailClickQueryParams): Promise<EmailClickQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get(url, { params });

    return response.data;
  }
}
