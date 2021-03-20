import { BaseResultParams, Create, CreatedSearchParams, DateString, IdSearchParams, OutputParams, OutputParamsFull, OutputParamsMobile, OutputParamsSimple, ResponseBase, Update, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface ProspectMobile {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    company: string | null;
}
interface ProspectBase extends ProspectMobile {
    salutation?: string | null;
    password?: string | null;
    prospect_account_id?: number;
    website?: string | null;
    job_title?: string | null;
    department?: string | null;
    country?: string | null;
    address_one?: string | null;
    address_two?: string | null;
    city?: string | null;
    state?: string | null;
    territory?: string | null;
    zip?: string | null;
    phone?: string | null;
    fax?: string | null;
    source?: string | null;
    annual_revenue?: string | null;
    employees?: string | null;
    industry?: string | null;
    years_in_business?: string | null;
    comments?: string | null;
    notes?: string | null;
    score?: number | null;
    is_do_not_email: boolean | null;
    is_do_not_call: boolean | null;
    is_reviewed: boolean | null;
    is_starred: boolean | null;
    is_archived: boolean | null;
}
export interface ProspectSimple extends ProspectBase {
    grade?: string | null;
    last_activity_at?: string | null;
    recent_interaction?: string | null;
    crm_lead_fid?: string | null;
    crm_contact_fid?: string | null;
    crm_owner_fid?: string | null;
    crm_account_fid?: string | null;
    crm_last_sync?: string | null;
    crm_url?: string | null;
    opted_out: boolean | null;
    created_at: string;
    updated_at: string;
    campaign?: {
        id: number;
        name: string;
    };
    assigned_to?: unknown;
    last_activity?: {
        visitor_activity: unknown;
    };
}
interface ProfileCriteria {
    id: number;
    name: string;
    matches: string;
}
export interface ProspectFull extends ProspectSimple {
    profile?: {
        id: number;
        name: string;
        profile_criteria: ProfileCriteria | ProfileCriteria[];
    };
    visitors?: {
        visitor: unknown | unknown[];
    } | null;
    visitor_activities?: {
        visitor_activity: unknown | unknown[];
    } | null;
    lists?: {
        list_subscription: unknown | unknown[];
    } | null;
}
export declare type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';
declare type ProspectSearchParams = {
    assigned?: boolean;
    assigned_to_user?: number | string;
    deleted?: boolean;
    grade_equal_to?: LetterGrade;
    grade_greater_than?: LetterGrade;
    grade_less_than?: LetterGrade;
    is_starred?: boolean;
    last_activity_before?: DateString;
    last_activity_after?: DateString;
    last_activity_never?: boolean;
    list_id?: number;
    new?: boolean;
    score_equal_to?: number;
    score_greater_than?: number;
    score_less_than?: number;
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface ProspectResultParams extends BaseResultParams {
    fields?: number[];
    limit_related_records?: boolean;
    sort_by?: 'created_at' | 'id' | 'probability' | 'value';
}
export declare type ProspectQueryParams = ProspectSearchParams & ProspectResultParams & OutputParams;
interface ProspectRequest extends Partial<ProspectBase> {
    campaign_id?: number;
}
export declare type UpdateProspect = Update<ProspectRequest>;
export declare type UpdateProspects = Partial<ProspectRequest>[];
export declare type UpdateProspectsV3 = {
    [idOrEmail: string]: UpdateProspect;
};
export declare type CreateProspect = Create<Omit<ProspectRequest, 'email'>>;
export declare type CreateProspects = Create<ProspectRequest, 'email'>[];
export declare type CreateProspectsV3 = {
    [email: string]: CreateProspect;
};
export declare type UpsertProspect = Partial<ProspectRequest>;
export declare type UpsertProspects = UpsertProspect[];
export declare type UpsertProspectsV3 = {
    [idOrEmail: string]: UpdateProspect;
};
export interface BatchResponse extends ResponseBase {
    errors: {
        [identifier: string]: string;
    };
}
export declare type AssignParams = ({
    user_email: string;
} | {
    user_id: number;
} | {
    group_id: number;
}) & OutputParams;
export interface ProspectQueryResponseMobile extends ResponseBase {
    result: {
        total_results: number;
        prospect: ProspectMobile | ProspectMobile[];
    };
}
export interface ProspectQueryResponseSimple extends ResponseBase {
    result: {
        total_results: number;
        prospect: ProspectSimple | ProspectSimple[];
    };
}
export interface ProspectQueryResponseFull extends ResponseBase {
    result: {
        total_results: number;
        prospect: ProspectFull | ProspectFull[];
    };
}
export interface ProspectResponseMobile extends ResponseBase {
    prospect: ProspectMobile;
}
export interface ProspectResponseSimple extends ResponseBase {
    prospect: ProspectSimple;
}
export interface ProspectResponseFull extends ResponseBase {
    prospect: ProspectFull;
}
export declare type ProspectResponse = ProspectResponseMobile | ProspectResponseSimple | ProspectResponseFull;
export default class Prospects extends ObjectsBase {
    objectName: string;
    query<T extends OutputParamsMobile & ProspectQueryParams>(params: T): Promise<ProspectQueryResponseMobile>;
    query<T extends OutputParamsSimple & ProspectQueryParams>(params: T): Promise<ProspectQueryResponseSimple>;
    query<T extends OutputParamsFull & ProspectQueryParams>(params?: T): Promise<ProspectQueryResponseFull>;
    create<T extends OutputParamsMobile>(email: string, data: CreateProspect, params: T): Promise<ProspectResponseMobile>;
    create<T extends OutputParamsSimple>(email: string, data: CreateProspect, params: T): Promise<ProspectResponseSimple>;
    create<T extends OutputParamsFull>(email: string, data: CreateProspect, params?: T): Promise<ProspectResponseFull>;
    readByEmail<T extends OutputParamsMobile>(email: string, params: T): Promise<ProspectResponseMobile>;
    readByEmail<T extends OutputParamsSimple>(email: string, params: T): Promise<ProspectResponseSimple>;
    readByEmail<T extends OutputParamsFull>(email: string, params?: T): Promise<ProspectResponseFull>;
    readById<T extends OutputParamsMobile>(id: number, params: T): Promise<ProspectResponseMobile>;
    readById<T extends OutputParamsSimple>(id: number, params: T): Promise<ProspectResponseSimple>;
    readById<T extends OutputParamsFull>(id: number, params?: T): Promise<ProspectResponseFull>;
    readByFid<T extends OutputParamsMobile>(fid: number, params: T): Promise<ProspectResponseMobile>;
    readByFid<T extends OutputParamsSimple>(fid: number, params: T): Promise<ProspectResponseSimple>;
    readByFid<T extends OutputParamsFull>(fid: number, params?: T): Promise<ProspectResponseFull>;
    updateById<T extends OutputParamsMobile>(id: number, update: UpdateProspect, params: T): Promise<ProspectResponseMobile>;
    updateById<T extends OutputParamsSimple>(id: number, update: UpdateProspect, params: T): Promise<ProspectResponseSimple>;
    updateById<T extends OutputParamsFull>(id: number, update: UpdateProspect, params?: T): Promise<ProspectResponseFull>;
    updateByFid<T extends OutputParamsMobile>(fid: number, update: UpdateProspect, params: T): Promise<ProspectResponseMobile>;
    updateByFid<T extends OutputParamsSimple>(fid: number, update: UpdateProspect, params: T): Promise<ProspectResponseSimple>;
    updateByFid<T extends OutputParamsFull>(fid: number, update: UpdateProspect, params?: T): Promise<ProspectResponseFull>;
    upsertByEmail<T extends OutputParamsMobile>(email: string, data: UpsertProspect, params: T): Promise<ProspectResponseMobile>;
    upsertByEmail<T extends OutputParamsSimple>(email: string, data: UpsertProspect, params: T): Promise<ProspectResponseSimple>;
    upsertByEmail<T extends OutputParamsFull>(email: string, data: UpsertProspect, params?: T): Promise<ProspectResponseFull>;
    upsertById<T extends OutputParamsMobile>(id: number, data: UpsertProspect, params: T): Promise<ProspectResponseMobile>;
    upsertById<T extends OutputParamsSimple>(id: number, data: UpsertProspect, params: T): Promise<ProspectResponseSimple>;
    upsertById<T extends OutputParamsFull>(id: number, data: UpsertProspect, params?: T): Promise<ProspectResponseFull>;
    upsertByFid<T extends OutputParamsMobile>(fid: number, data: UpsertProspect, params: T): Promise<ProspectResponseMobile>;
    upsertByFid<T extends OutputParamsSimple>(fid: number, data: UpsertProspect, params: T): Promise<ProspectResponseSimple>;
    upsertByFid<T extends OutputParamsFull>(fid: number, data: UpsertProspect, params?: T): Promise<ProspectResponseFull>;
    assignById<T extends OutputParamsMobile & AssignParams>(id: number, params: T): Promise<ProspectResponseMobile>;
    assignById<T extends OutputParamsSimple & AssignParams>(id: number, params: T): Promise<ProspectResponseSimple>;
    assignById<T extends OutputParamsFull & AssignParams>(id: number, params: T): Promise<ProspectResponseFull>;
    assignByFid<T extends OutputParamsMobile & AssignParams>(fid: number, params: T): Promise<ProspectResponseMobile>;
    assignByFid<T extends OutputParamsSimple & AssignParams>(fid: number, params: T): Promise<ProspectResponseSimple>;
    assignByFid<T extends OutputParamsFull & AssignParams>(fid: number, params: T): Promise<ProspectResponseFull>;
    unassignById<T extends OutputParamsMobile>(id: number, params: T): Promise<ProspectResponseMobile>;
    unassignById<T extends OutputParamsSimple>(id: number, params: T): Promise<ProspectResponseSimple>;
    unassignById<T extends OutputParamsFull>(id: number, params?: T): Promise<ProspectResponseFull>;
    unassignByFid<T extends OutputParamsMobile>(fid: number, params: T): Promise<ProspectResponseMobile>;
    unassignByFid<T extends OutputParamsSimple>(fid: number, params: T): Promise<ProspectResponseSimple>;
    unassignByFid<T extends OutputParamsFull>(fid: number, params?: T): Promise<ProspectResponseFull>;
    batchCreate(prospects: CreateProspects | CreateProspectsV3): Promise<BatchResponse>;
    batchUpdate(prospects: UpdateProspects | UpdateProspectsV3): Promise<BatchResponse>;
    batchUpsert(prospects: UpsertProspects | UpsertProspectsV3): Promise<BatchResponse>;
    deleteById(id: number): Promise<void>;
    deleteByFid(fid: number): Promise<void>;
    deleteByEmail(email: string): Promise<void>;
}
export {};
