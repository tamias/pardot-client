import {
  BaseResultParams,
  CreatedSearchParams,
  IdSearchParams,
  ResponseBase,
  UpdatedSearchParams,
} from './types';
import ObjectsBase from './base';

export interface CustomRedirect {
  id: number;
  name: string;
  url: string;
  destination_url: string;
  campaign: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

type CustomRedirectSearchParams = IdSearchParams & CreatedSearchParams & UpdatedSearchParams;

interface CustomRedirectResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

export type CustomRedirectQueryParams = CustomRedirectSearchParams & CustomRedirectResultParams;

export interface CustomRedirectQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    customRedirect: CustomRedirect | CustomRedirect[];
  };
}

export interface CustomRedirectResponse extends ResponseBase {
  customRedirect: CustomRedirect;
}

export default class CustomRedirects extends ObjectsBase {
  objectName = 'customRedirect';

  public async query(params?: CustomRedirectQueryParams): Promise<CustomRedirectQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<CustomRedirectQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<CustomRedirectResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<CustomRedirectResponse>(url);

    return response.data;
  }
}
