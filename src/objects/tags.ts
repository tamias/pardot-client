import {
  BaseResultParams,
  CreatedSearchParams,
  IdSearchParams,
  ResponseBase,
  UpdatedSearchParams,
} from './types';
import ObjectsBase from './base';

export interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

type TagSearchParams = {
  name?: string;
} & IdSearchParams &
  CreatedSearchParams &
  UpdatedSearchParams;

interface TagResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}

export type TagQueryParams = TagSearchParams & TagResultParams;

export interface TagQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    tag: Tag | Tag[];
  };
}

export interface TagResponse extends ResponseBase {
  tag: Tag;
}

export default class Tags extends ObjectsBase {
  objectName = 'tag';

  public async query(params?: TagQueryParams): Promise<TagQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<TagQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<TagResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<TagResponse>(url);

    return response.data;
  }
}
