import { BaseResultParams, ResponseBase } from './types';
import ObjectsBase from './base';
interface VisitorPageView {
    id: number;
    url: string;
    title: string;
    created_at: string;
}
export interface Visit {
    id: number;
    visitor_id: number;
    prospect_id: number | null;
    visitor_page_view_count: number;
    first_visitor_page_view_at: string;
    last_visitor_page_view_at: string;
    duration_in_seconds: number;
    campaign_parameter: string | null;
    medium_parameter: string | null;
    source_parameter: string | null;
    content_parameter: string | null;
    term_parameter: string | null;
    created_at: string;
    updated_at: string;
    visitor_page_views: {
        visitor_page_view: VisitorPageView | VisitorPageView[];
    };
}
declare type VisitResultParams = Pick<BaseResultParams, 'limit' | 'offset'>;
export declare type VisitQueryParams = VisitResultParams;
export interface VisitQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        visit?: Visit | Visit[];
    };
}
export interface VisitResponse extends ResponseBase {
    visit: Visit;
}
export default class Visits extends ObjectsBase {
    objectName: string;
    queryByIds(ids: number[], params?: VisitQueryParams): Promise<VisitQueryResponse>;
    queryByVisitorIds(visitorIds: number[], params?: VisitQueryParams): Promise<VisitQueryResponse>;
    queryByProspectIds(prospectIds: number[], params?: VisitQueryParams): Promise<VisitQueryResponse>;
    read(id: number): Promise<VisitResponse>;
}
export {};
