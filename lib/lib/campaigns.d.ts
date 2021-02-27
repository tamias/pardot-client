import { BaseSearchParameters, CampaignQueryResponse, CampaignResponse, CreateCampaign, SortOrder, UpdateCampaign } from '../types';
import ObjectsBase from './objects-base';
interface CampaignSearchParameters extends BaseSearchParameters {
    name?: string;
}
declare type SortBy = 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
interface ResultParameters {
    format?: 'json' | 'xml';
    limit?: number;
    offset?: number;
    sort_by?: SortBy;
    sort_order?: SortOrder;
}
export default class Campaigns extends ObjectsBase {
    objectName: string;
    query(params?: CampaignSearchParameters & ResultParameters): Promise<CampaignQueryResponse>;
    read(id: number): Promise<CampaignResponse>;
    update(id: number, update: UpdateCampaign): Promise<CampaignResponse>;
    create(data: CreateCampaign): Promise<CampaignResponse>;
}
export {};
