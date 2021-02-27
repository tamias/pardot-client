import {
  BaseSearchParameters,
  CampaignQueryResponse,
  CampaignResponse,
  CreateCampaign,
  SortOrder,
  UpdateCampaign,
} from '../types';
import ObjectsBase from './objects-base';

interface CampaignSearchParameters extends BaseSearchParameters {
  name?: string;
}

type SortBy = 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';

interface ResultParameters {
  format?: 'json' | 'xml';
  limit?: number;
  offset?: number;
  sort_by?: SortBy;
  sort_order?: SortOrder;
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
