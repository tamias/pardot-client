import { BaseResultParams, CreatedSearchParams, IdSearchParams, OutputParams, OutputParamsFull, OutputParamsMobile, OutputParamsSimple, ResponseBase, UpdatedSearchParams } from './types';
import { ProspectMobile } from './prospects';
import ObjectsBase from './base';
interface VisitorBase {
    id: number;
    page_view_count?: number;
    ip_address?: string;
    hostname?: string;
    created_at: string;
    updated_at: string;
}
export interface VisitorMobile extends VisitorBase {
    prospect_id: number | null;
}
export interface VisitorSimple extends VisitorMobile {
    browser: string | null;
    browser_version: string | null;
    operating_system: string | null;
    operating_system_version: string | null;
    language: string | null;
    screen_height: string | null;
    screen_width: string | null;
    is_flash_enabled: boolean | null;
    is_java_enabled: boolean | null;
    campaign_parameter?: string;
    medium_parameter?: string;
    source_parameter?: string;
    content_parameter?: string;
    term_parameter?: string;
}
interface VisitorReferrer {
    id: number;
    referrer: string;
    vendor: string | null;
    type: string | null;
    query: string | null;
}
export interface VisitorFull extends VisitorBase {
    prospect?: ProspectMobile;
    identified_company?: {
        name: string | null;
        street_address: string | null;
        city: string | null;
        state: string | null;
        postal_code: string | null;
        country: string | null;
        email: string | null;
    };
    visitor_referrer: VisitorReferrer | VisitorReferrer[];
    visitor_activities: {
        visitor_activity: unknown;
    };
}
declare type VisitorSearchParams = {
    only_identified?: boolean;
    prospect_ids?: number[];
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface VisitorResultParams extends BaseResultParams {
    fields?: string[];
    sort_by?: 'created_at' | 'id' | 'updated_at';
}
export declare type VisitorQueryParams = VisitorSearchParams & VisitorResultParams & OutputParams;
export declare type VisitorAssignParams = ({
    prospect_email: string;
} | {
    prospect_id: number;
}) & OutputParams;
export interface VisitorQueryResponseMobile extends ResponseBase {
    result: {
        total_results: number;
        visitor: VisitorMobile | VisitorMobile[];
    };
}
export interface VisitorQueryResponseSimple extends ResponseBase {
    result: {
        total_results: number;
        visitor: VisitorSimple | VisitorSimple[];
    };
}
export interface VisitorResponseMobile extends ResponseBase {
    visitor: VisitorMobile;
}
export interface VisitorResponseSimple extends ResponseBase {
    visitor: VisitorSimple;
}
export interface VisitorResponseFull extends ResponseBase {
    visitor: VisitorFull;
}
export declare type VisitorResponse = VisitorResponseMobile | VisitorResponseSimple | VisitorResponseFull;
export default class Visitors extends ObjectsBase {
    objectName: string;
    query<T extends OutputParamsMobile & VisitorQueryParams>(params: T): Promise<VisitorQueryResponseMobile>;
    query<T extends OutputParamsSimple & VisitorQueryParams>(params: T): Promise<VisitorQueryResponseSimple>;
    query<T extends OutputParamsFull & VisitorQueryParams>(param?: T): Promise<VisitorQueryResponseSimple>;
    read<T extends OutputParamsMobile>(id: number, params: T): Promise<VisitorResponseMobile>;
    read<T extends OutputParamsSimple>(id: number, params: T): Promise<VisitorResponseSimple>;
    read<T extends OutputParamsFull>(id: number, params?: T): Promise<VisitorResponseFull>;
    assign<T extends OutputParamsMobile & VisitorAssignParams>(id: number, params: T): Promise<VisitorResponseMobile>;
    assign<T extends OutputParamsSimple & VisitorAssignParams>(id: number, params: T): Promise<VisitorResponseSimple>;
    assign<T extends OutputParamsFull & VisitorAssignParams>(id: number, params: T): Promise<VisitorResponseFull>;
}
export {};
