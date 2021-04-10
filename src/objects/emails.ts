import { ResponseBase } from './types';
import ObjectsBase from './base';

export interface Email {
  id: number;
  name: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface EmailStats {
  sent: number;
  delivered: number;
  total_clicks: number;
  unique_clicks: number;
  soft_bounced: number;
  hard_bounced: number;
  opt_outs: number;
  spam_complaints: number;
  opens: number;
  unique_opens: number;
  delivery_rate: number;
  opens_rate: number;
  click_through_rate: number;
  unique_click_through_rate: number;
  click_open_ratio: number;
  out_out_rate: number;
  spam_complaint_rate: number;
}

export type EmailSendParams = {
  campaign_id: number;
} & (
  | {
      email_template_id: number;
    }
  | ({
      text_content: string;
      name: string;
      subject: string;
    } & (
      | {
          from_email: string;
          from_name: string;
        }
      | { from_user_id: number }
    ))
);

export interface EmailResponse extends ResponseBase {
  email: Email;
}

export interface EmailStatsResponse extends ResponseBase {
  stats: EmailStats;
}

export default class Emails extends ObjectsBase {
  objectName = 'email';

  public async read(id: number): Promise<EmailResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<EmailResponse>(url);

    return response.data;
  }

  public async stats(id: number): Promise<EmailStatsResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['stats', 'id', id]);

    const response = await this.parent.axios.get<EmailStatsResponse>(url);

    return response.data;
  }

  public async sendToEmail(prospectEmail: string, params: EmailSendParams): Promise<EmailResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['send', 'prospect_email', prospectEmail]);

    const response = await this.parent.axios.post<EmailResponse>(url, params);

    return response.data;
  }

  public async sendToId(prospectId: number, params: EmailSendParams): Promise<EmailResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['send', 'prospect_id', prospectId]);

    const response = await this.parent.axios.post<EmailResponse>(url, params);

    return response.data;
  }

  public async sendToLists(listIds: number[], params: EmailSendParams): Promise<EmailResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['send']);

    const response = await this.parent.axios.post<EmailResponse>(url, {
      ...params,
      list_ids: listIds,
    });

    return response.data;
  }
}
