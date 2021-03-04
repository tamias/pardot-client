import {
  BaseResultParameters,
  BaseSearchParameters,
  DateString,
  ResponseBase,
  Update,
} from './types';
import ObjectsBase from './base';

interface CampaignSearchParameters extends BaseSearchParameters {
  name?: string;
  updated_before?: DateString;
  updated_after?: DateString;
}

interface ResultParameters extends BaseResultParameters {
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
}

export interface Campaign {
  id: number;
  name: string;
  cost: number | null;
}

export type UpdateCampaign = Update<Campaign>;
export type CreateCampaign = UpdateCampaign & Pick<Campaign, 'name'>;

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
  objectName = 'campaign';

  public async query(
    params?: CampaignSearchParameters & ResultParameters,
  ): Promise<CampaignQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<CampaignQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<CampaignResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<CampaignResponse>(url);

    return response.data;
  }

  public async update(id: number, update: UpdateCampaign): Promise<CampaignResponse> {
    const url = this.parent.getApiUrl(this.objectName, `update/id/${id}`);

    const response = await this.parent.axios.post<CampaignResponse>(url, update);

    return response.data;
  }

  public async create(data: CreateCampaign): Promise<CampaignResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'create');

    const response = await this.parent.axios.post<CampaignResponse>(url, data);

    return response.data;
  }
}
