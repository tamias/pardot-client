import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';

export interface TagObject {
  id: number;
  tag_id: number;
  type: string;
  object_id: number;
  created_at: string;
}

type TagObjectType =
  | 'Automation'
  | 'Block'
  | 'Campaign'
  | 'Competitor'
  | 'Prospect Custom Field'
  | 'Custom URL'
  | 'Drip Program'
  | 'Email'
  | 'Email Draft'
  | 'Email Template'
  | 'Email Template Draft'
  | 'File'
  | 'Form'
  | 'Form Field'
  | 'Form Handler'
  | 'Group'
  | 'Keyword'
  | 'Landing Page'
  | 'Layout Template'
  | 'List'
  | 'Opportunity'
  | 'Paid Search Campaign'
  | 'Personalization'
  | 'Profile'
  | 'Prospect'
  | 'Prospect Default Account'
  | 'Segmentation Rule'
  | 'Site'
  | 'Site Search'
  | 'Social Message'
  | 'User'
  | 'Dynamic Content';

type TagObjectSearchParams = {
  tag_id?: number;
  type?: TagObjectType;
  object_id?: number;
} & IdSearchParams &
  CreatedSearchParams;

interface TagObjectResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

export type TagObjectQueryParams = TagObjectSearchParams & TagObjectResultParams;

export interface TagObjectQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    tagObject: TagObject | TagObject[];
  };
}

export interface TagObjectResponse extends ResponseBase {
  tagObject: TagObject;
}

export default class TagObjects extends ObjectsBase {
  objectName = 'tagObject';

  public async query(params?: TagObjectQueryParams): Promise<TagObjectQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<TagObjectQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<TagObjectResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<TagObjectResponse>(url);

    return response.data;
  }
}
