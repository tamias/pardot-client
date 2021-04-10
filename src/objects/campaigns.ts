import {
  BaseResultParams,
  Create,
  CreatedSearchParams,
  IdSearchParams,
  ResponseBase,
  Update,
  UpdatedSearchParams,
} from './types';
import ObjectsBase from './base';

export interface Campaign {
  id: number;
  name: string;
  cost: number | null;
}

type CampaignSearchParams = {
  name?: string;
} & IdSearchParams &
  CreatedSearchParams &
  UpdatedSearchParams;

interface CampaignResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
}

export type CampaignQueryParams = CampaignSearchParams & CampaignResultParams;

export type UpdateCampaign = Update<Campaign>;
export type CreateCampaign = Create<Campaign, 'name'>;

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
  objectName = 'campaign';

  public async query(params?: CampaignQueryParams): Promise<CampaignQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<CampaignQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<CampaignResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<CampaignResponse>(url);

    return response.data;
  }

  public async update(id: number, update: UpdateCampaign): Promise<CampaignResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['update', 'id', id]);

    const response = await this.parent.axios.post<CampaignResponse>(url, update);

    return response.data;
  }

  public async create(data: CreateCampaign): Promise<CampaignResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['create']);

    const response = await this.parent.axios.post<CampaignResponse>(url, data);

    return response.data;
  }
}
