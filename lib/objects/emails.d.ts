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
export declare type EmailSendParams = {
    campaign_id: number;
} & ({
    email_template_id: number;
} | ({
    text_content: string;
    name: string;
    subject: string;
} & ({
    from_email: string;
    from_name: string;
} | {
    from_user_id: number;
})));
export interface EmailResponse extends ResponseBase {
    email: Email;
}
export interface EmailStatsResponse extends ResponseBase {
    stats: EmailStats;
}
export default class Emails extends ObjectsBase {
    objectName: string;
    read(id: number): Promise<EmailResponse>;
    stats(id: number): Promise<EmailStatsResponse>;
    sendToEmail(prospectEmail: string, params: EmailSendParams): Promise<EmailResponse>;
    sendToId(prospectId: number, params: EmailSendParams): Promise<EmailResponse>;
    sendToLists(listIds: number[], params: EmailSendParams): Promise<EmailResponse>;
}
