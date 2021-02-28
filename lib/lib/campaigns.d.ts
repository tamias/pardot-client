import { BaseResultParameters, BaseSearchParameters, CampaignQueryResponse, CampaignResponse, CreateCampaign, DateString, UpdateCampaign } from '../types';
import ObjectsBase from './objects-base';
interface CampaignSearchParameters extends BaseSearchParameters {
    name?: string;
    updated_before?: DateString;
    updated_after?: DateString;
}
interface ResultParameters extends BaseResultParameters {
    sort_by?: 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
}
export default class Campaigns extends ObjectsBase {
    objectName: string;
    query(params?: CampaignSearchParameters & ResultParameters): Promise<CampaignQueryResponse>;
    read(id: number): Promise<CampaignResponse>;
    update(id: number, update: UpdateCampaign): Promise<CampaignResponse>;
    create(data: CreateCampaign): Promise<CampaignResponse>;
}
export {};
