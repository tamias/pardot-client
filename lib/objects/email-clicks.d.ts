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
declare type EmailClickSearchParams = {
    list_email_id?: number;
    drip_program_action_id?: number;
    email_template_id?: number;
    tracker_redirect_id?: number;
} & IdSearchParams & CreatedSearchParams;
interface EmailClickResultParams {
    limit?: number;
}
declare type EmailClickQueryParams = EmailClickSearchParams & EmailClickResultParams;
export interface EmailClickQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        emailClick?: EmailClick | EmailClick[];
    };
}
export default class EmailClicks extends ObjectsBase {
    objectName: string;
    query(params?: EmailClickQueryParams): Promise<EmailClickQueryResponse>;
}
export {};
