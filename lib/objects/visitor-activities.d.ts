import { BaseResultParams, CreatedSearchParams, IdSearchParams, OutputParams, OutputParamsFull, OutputParamsMobile, OutputParamsSimple, ResponseBase, UpdatedSearchParams, ValueOf } from './types';
import { VISITOR_ACTIVITY_TYPE_NAMES } from './constants';
import ObjectsBase from './base';
declare type VisitorActivityTypeNames = typeof VISITOR_ACTIVITY_TYPE_NAMES;
export declare type VisitorActivityTypeName = ValueOf<VisitorActivityTypeNames>;
interface VisitorActivityBase {
    id: number;
    visitor_id?: number;
    prospect_id?: number;
    type: number;
    type_name: VisitorActivityTypeName;
    details: string;
    campaign: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}
interface VisitorActivityMobileCustomRedirect extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.CustomRedirect;
    custom_redirect_id: number;
}
interface VisitorActivityMobileEmail extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.Email;
    email_id: number;
    list_email_id: number;
}
interface VisitorActivityMobileFile extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.File;
    file_id: number;
}
interface VisitorActivityMobileForm extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.Form;
    form_id: number;
}
interface VisitorActivityMobileFormHandler extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.FormHandler;
    form_handler_id: number;
}
interface VisitorActivityMobileLandingPage extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.LandingPage;
    landing_page_id: number;
}
interface VisitorActivityMobileVisit extends VisitorActivityBase {
    type_name: typeof VISITOR_ACTIVITY_TYPE_NAMES.Visit;
    visit_id: number;
}
export declare type VisitorActivityMobile = VisitorActivityMobileCustomRedirect | VisitorActivityMobileEmail | VisitorActivityMobileFile | VisitorActivityMobileForm | VisitorActivityMobileFormHandler | VisitorActivityMobileLandingPage | VisitorActivityMobileVisit;
export declare type VisitorActivitySimple = VisitorActivityMobile;
export interface VisitorActivityInfo {
    name: string;
    app_url: string;
}
interface VisitorActivityFullCustomRedirect extends VisitorActivityMobileCustomRedirect {
    custom_redirect: VisitorActivityInfo;
}
interface VisitorActivityFullEmail extends VisitorActivityMobileEmail {
    email: VisitorActivityInfo;
}
interface VisitorActivityFullFile extends VisitorActivityMobileFile {
    file: VisitorActivityInfo;
}
interface VisitorActivityFullForm extends VisitorActivityMobileForm {
    form: VisitorActivityInfo;
}
interface VisitorActivityFullFormHandler extends VisitorActivityMobileFormHandler {
    form_handler: VisitorActivityInfo;
}
interface VisitorActivityFullLandingPage extends VisitorActivityMobileLandingPage {
    landing_page: VisitorActivityInfo;
}
declare type VisitorActivityFullVisit = VisitorActivityMobileVisit;
export declare type VisitorActivityFull = VisitorActivityFullCustomRedirect | VisitorActivityFullEmail | VisitorActivityFullFile | VisitorActivityFullForm | VisitorActivityFullFormHandler | VisitorActivityFullLandingPage | VisitorActivityFullVisit;
declare type VisitorActivitySearchParams = {
    prospect_only?: boolean;
    type?: number | number[];
    custom_url_only?: boolean;
    email_only?: boolean;
    file_only?: boolean;
    form_only?: boolean;
    form_handler_only?: boolean;
    landing_page_only?: boolean;
    campaign_id?: number | number[];
    custom_url_id?: number | number[];
    email_id?: number | number[];
    file_id?: number | number[];
    form_id?: number | number[];
    form_handler_id?: number | number[];
    landing_page_id?: number | number[];
    prospect_id?: number | number[];
    visitor_id?: number | number[];
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface VisitorActivityResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'prospect_id' | 'visitor_id' | 'updated_at';
}
export declare type VisitorActivityQueryParams = VisitorActivitySearchParams & VisitorActivityResultParams & OutputParams;
export interface VisitorActivityQueryResponseMobile extends ResponseBase {
    result: {
        total_results: number;
        visitor_activity?: VisitorActivityMobile | VisitorActivityMobile[];
    };
}
export interface VisitorActivityQueryResponseSimple extends ResponseBase {
    result: {
        total_results: number;
        visitor_activity?: VisitorActivitySimple | VisitorActivitySimple[];
    };
}
export interface VisitorActivityQueryResponseFull extends ResponseBase {
    result: {
        total_results: number;
        visitor_activity?: VisitorActivityFull | VisitorActivityFull[];
    };
}
export declare type VisitorActivityQueryResponse = VisitorActivityQueryResponseMobile | VisitorActivityQueryResponseSimple | VisitorActivityQueryResponseFull;
export interface VisitorActivityResponseMobile extends ResponseBase {
    visitor_activity: VisitorActivityMobile;
}
export interface VisitorActivityResponseSimple extends ResponseBase {
    visitor_activity: VisitorActivitySimple;
}
export interface VisitorActivityResponseFull extends ResponseBase {
    visitor_activity: VisitorActivityFull;
}
export default class VisitorActivities extends ObjectsBase {
    objectName: string;
    query<T extends OutputParamsMobile & VisitorActivityQueryParams>(params: T): Promise<VisitorActivityQueryResponseMobile>;
    query<T extends OutputParamsSimple & VisitorActivityQueryParams>(params: T): Promise<VisitorActivityQueryResponseSimple>;
    query<T extends OutputParamsFull & VisitorActivityQueryParams>(params?: T): Promise<VisitorActivityQueryResponseFull>;
    read<T extends OutputParamsMobile>(id: number, params: T): Promise<VisitorActivityResponseMobile>;
    read<T extends OutputParamsSimple>(id: number, params: T): Promise<VisitorActivityResponseSimple>;
    read<T extends OutputParamsFull>(id: number, params?: T): Promise<VisitorActivityResponseFull>;
}
export {};
