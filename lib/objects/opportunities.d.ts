import { BaseResultParams, Create, CreatedSearchParams, IdSearchParams, OutputParams, OutputParamsFull, OutputParamsMobile, OutputParamsSimple, ResponseBase, Update } from './types';
import ObjectsBase from './base';
export interface OpportunityMobile {
    id: number;
    campaign_id: number;
    name: string;
    value: number;
    probability: number;
    type: string;
    stage: string;
    status: 'won' | 'lost' | 'open';
    closed_at: string;
    created_at: string;
    updated_at: string;
}
export interface OpportunitySimple extends OpportunityMobile {
    campaign: {
        id: number;
        name: string;
    };
    prospects: {
        prospect: unknown | unknown[];
    };
}
export interface OpportunityFull extends OpportunitySimple {
    opportunity_activities: {
        visitor_activity: unknown;
    };
}
declare type OpportunitySearchParams = {
    probability_greater_than?: number;
    probability_less_than?: number;
    prospect_email?: string;
    prospect_id?: number;
    value_greater_than?: number;
    value_less_than?: number;
} & IdSearchParams & CreatedSearchParams;
interface OpportunityResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'probability' | 'value';
}
export declare type OpportunityQueryParams = OpportunitySearchParams & OpportunityResultParams & OutputParams;
export declare type UpdateOpportunity = Update<OpportunityMobile>;
export declare type CreateOpportunity = Create<OpportunityMobile, 'campaign_id' | 'name' | 'value' | 'probability'>;
export interface OpportunityQueryResponseMobile extends ResponseBase {
    result: {
        total_results: number;
        opportunity: OpportunityMobile | OpportunityMobile[];
    };
}
export interface OpportunityQueryResponseSimple extends ResponseBase {
    result: {
        total_results: number;
        opportunity: OpportunitySimple | OpportunitySimple[];
    };
}
export interface OpportunityQueryResponseFull extends ResponseBase {
    result: {
        total_results: number;
        opportunity: OpportunityFull | OpportunityFull[];
    };
}
export declare type OpportunityQueryResponse = OpportunityQueryResponseMobile | OpportunityQueryResponseSimple | OpportunityQueryResponseFull;
export interface OpportunityResponseMobile extends ResponseBase {
    opportunity: OpportunityMobile;
}
export interface OpportunityResponseSimple extends ResponseBase {
    opportunity: OpportunitySimple;
}
export interface OpportunityResponseFull extends ResponseBase {
    opportunity: OpportunityFull;
}
export declare type OpportunityResponse = OpportunityResponseMobile | OpportunityResponseSimple | OpportunityResponseFull;
export default class Opportunities extends ObjectsBase {
    objectName: string;
    query<T extends OutputParamsMobile & OpportunityQueryParams>(params: T): Promise<OpportunityQueryResponseMobile>;
    query<T extends OutputParamsSimple & OpportunityQueryParams>(params: T): Promise<OpportunityQueryResponseSimple>;
    query<T extends OutputParamsFull & OpportunityQueryParams>(params?: T): Promise<OpportunityQueryResponseFull>;
    read<T extends OutputParamsMobile & OpportunityQueryParams>(id: number, params: T): Promise<OpportunityResponseMobile>;
    read<T extends OutputParamsSimple & OpportunityQueryParams>(id: number, params: T): Promise<OpportunityResponseSimple>;
    read<T extends OutputParamsFull & OpportunityQueryParams>(id: number, params?: T): Promise<OpportunityResponseFull>;
    createByEmail<T extends OutputParamsMobile & OpportunityQueryParams>(prospectEmail: string, create: CreateOpportunity, params: T): Promise<OpportunityResponseMobile>;
    createByEmail<T extends OutputParamsSimple & OpportunityQueryParams>(prospectEmail: string, create: CreateOpportunity, params: T): Promise<OpportunityResponseSimple>;
    createByEmail<T extends OutputParamsFull & OpportunityQueryParams>(prospectEmail: string, create: CreateOpportunity, params?: T): Promise<OpportunityResponseFull>;
    createById<T extends OutputParamsMobile & OpportunityQueryParams>(prospectId: number, create: CreateOpportunity, params: T): Promise<OpportunityResponseMobile>;
    createById<T extends OutputParamsSimple & OpportunityQueryParams>(prospectId: number, create: CreateOpportunity, params: T): Promise<OpportunityResponseSimple>;
    createById<T extends OutputParamsFull & OpportunityQueryParams>(prospectId: number, create: CreateOpportunity, params?: T): Promise<OpportunityResponseFull>;
    update<T extends OutputParamsMobile & OpportunityQueryParams>(id: number, update: UpdateOpportunity, params: T): Promise<OpportunityResponseMobile>;
    update<T extends OutputParamsSimple & OpportunityQueryParams>(id: number, update: UpdateOpportunity, params: T): Promise<OpportunityResponseSimple>;
    update<T extends OutputParamsFull & OpportunityQueryParams>(id: number, update: UpdateOpportunity, params?: T): Promise<OpportunityResponseFull>;
    delete(id: number): Promise<void>;
    undelete(id: number): Promise<void>;
}
export {};
