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

export interface List {
  id: number;
  name: string;
  is_public: boolean;
  is_dynamic: boolean;
  title: string | null;
  description: string | null;
  is_crm_visible: boolean;
  created_at: string;
  updated_at: string;
}

type ListSearchParams = {
  name?: string;
} & IdSearchParams &
  CreatedSearchParams &
  UpdatedSearchParams;

interface ListResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}

export type UpdateList = Update<List>;
export type CreateList = Create<List>;

export interface ListQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    list: List | List[];
  };
}

export interface ListResponse extends ResponseBase {
  list: List;
}

export default class Lists extends ObjectsBase {
  objectName = 'list';

  public async query(params?: ListSearchParams & ListResultParams): Promise<ListQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<ListQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<ListResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<ListResponse>(url);

    return response.data;
  }

  public async update(id: number, update: UpdateList): Promise<ListResponse> {
    const url = this.parent.getApiUrl(this.objectName, `update/id/${id}`);

    const response = await this.parent.axios.post<ListResponse>(url, update);

    return response.data;
  }

  public async create(data: CreateList): Promise<ListResponse> {
    const url = this.parent.getApiUrl(this.objectName, `create`);

    const response = await this.parent.axios.post<ListResponse>(url, data);

    return response.data;
  }

  public async delete(id: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, `delete/id/${id}`);

    await this.parent.axios.post(url);
  }
}
