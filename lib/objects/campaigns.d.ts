import { BaseResultParams, BaseSearchParams, DateString, ResponseBase, Update } from './types';
import ObjectsBase from './base';
export interface Campaign {
    id: number;
    name: string;
    cost: number | null;
}
interface CampaignSearchParams extends BaseSearchParams {
    name?: string;
    updated_before?: DateString;
    updated_after?: DateString;
}
interface CampaignResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
}
export declare type UpdateCampaign = Update<Campaign>;
export declare type CreateCampaign = UpdateCampaign & Pick<Campaign, 'name'>;
export interface CampaignQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        campaign: Campaign | Campaign[];
    };
}
export interface CampaignResponse extends ResponseBase {
    campaign: Campaign;
}
export default class Campaigns extends ObjectsBase {
    objectName: string;
    query(params?: CampaignSearchParams & CampaignResultParams): Promise<CampaignQueryResponse>;
    read(id: number): Promise<CampaignResponse>;
    update(id: number, update: UpdateCampaign): Promise<CampaignResponse>;
    create(data: CreateCampaign): Promise<CampaignResponse>;
}
export {};
