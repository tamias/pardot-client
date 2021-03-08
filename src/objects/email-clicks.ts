import { BaseSearchParams, ResponseBase } from './types';
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

interface EmailClickSearchParams extends BaseSearchParams {
  list_email_id?: number;
  drip_program_action_id?: number;
  email_template_id?: number;
  tracker_redirect_id?: number;
}

// does the API really not accept 'offset' when querying email clicks?
interface EmailClickResultParams {
  format?: 'json' | 'xml';
  limit?: number;
}

export interface EmailClickQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    emailClick: EmailClick | EmailClick[];
  };
}

export default class EmailClicks extends ObjectsBase {
  objectName = 'emailClick';

  public async query(
    params?: EmailClickSearchParams & EmailClickResultParams,
  ): Promise<EmailClickQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get(url, { params });

    return response.data;
  }
}
