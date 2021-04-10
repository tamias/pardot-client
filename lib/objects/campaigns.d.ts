import { BaseResultParams, Create, CreatedSearchParams, IdSearchParams, ResponseBase, Update, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface Campaign {
    id: number;
    name: string;
    cost: number | null;
}
declare type CampaignSearchParams = {
    name?: string;
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface CampaignResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
}
export declare type CampaignQueryParams = CampaignSearchParams & CampaignResultParams;
export declare type UpdateCampaign = Update<Campaign>;
export declare type CreateCampaign = Create<Campaign, 'name'>;
export interface CampaignQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        campaign?: Campaign | Campaign[];
    };
}
export interface CampaignResponse extends ResponseBase {
    campaign: Campaign;
}
export default class Campaigns extends ObjectsBase {
    objectName: string;
    query(params?: CampaignQueryParams): Promise<CampaignQueryResponse>;
    read(id: number): Promise<CampaignResponse>;
    update(id: number, update: UpdateCampaign): Promise<CampaignResponse>;
    create(data: CreateCampaign): Promise<CampaignResponse>;
}
export {};
