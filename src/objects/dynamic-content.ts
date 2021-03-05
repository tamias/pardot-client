import { BaseResultParameters, BaseSearchParameters, DateString, ResponseBase } from './types';
import ObjectsBase from './base';

interface DynamicContentSearchParameters extends BaseSearchParameters {
  updated_before?: DateString;
  updated_after?: DateString;
}

interface DynamicContentResultParameters extends BaseResultParameters {
  sort_by?: 'created_at' | 'id';
}

interface Variation {
  comparison: string;
  content: string;
}

export interface DynamicContentItem {
  id: number;
  name: string;
  embedCode: string;
  embedUrl: string;
  baseContent: string;
  basedOn: string;
  variation: Variation | Variation[];
  created_at: string;
  updated_at: string;
}

export interface DynamicContentQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    dynamicContent: DynamicContentItem | DynamicContentItem[];
  };
}

export interface DynamicContentResponse extends ResponseBase {
  dynamicContent: DynamicContentItem;
}

export default class DynamicContent extends ObjectsBase {
  objectName = 'dynamicContent';

  public async query(
    params?: DynamicContentSearchParameters & DynamicContentResultParameters,
  ): Promise<DynamicContentQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<DynamicContentQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<DynamicContentResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<DynamicContentResponse>(url);

    return response.data;
  }
}
