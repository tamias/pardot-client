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

export interface ListMembership {
  id: number;
  list_id: number;
  prospect_id: number;
  opted_out: boolean;
  created_at: string;
  updated_at: string;
}

type ListMembershipSearchParams = {
  deleted?: boolean;
  list_id?: number;
} & IdSearchParams &
  CreatedSearchParams &
  UpdatedSearchParams;

interface ListMembershipResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

export type ListMembershipQueryParams = ListMembershipSearchParams & ListMembershipResultParams;

export type UpdateListMembership = Update<ListMembership>;
export type CreateListMembership = Create<ListMembership>;

export interface ListMembershipQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    list_membership: ListMembership | ListMembership[];
  };
}

export interface ListMembershipResponse extends ResponseBase {
  list_membership: ListMembership;
}

export default class ListMemberships extends ObjectsBase {
  objectName = 'listMembership';

  public async query(params?: ListMembershipQueryParams): Promise<ListMembershipQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<ListMembershipQueryResponse>(url, { params });

    return response.data;
  }

  public async read(listId: number, prospectId: number): Promise<ListMembershipResponse> {
    const url = this.parent.getApiUrl(
      this.objectName,
      `read/list_id/${listId}/prospect_id/${prospectId}`,
    );

    const response = await this.parent.axios.get<ListMembershipResponse>(url);

    return response.data;
  }

  public async readById(id: number): Promise<ListMembershipResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<ListMembershipResponse>(url);

    return response.data;
  }

  public async create(
    listId: number,
    prospectId: number,
    data: CreateListMembership,
  ): Promise<ListMembershipResponse> {
    const url = this.parent.getApiUrl(
      this.objectName,
      `create/list_id/${listId}/prospect_id/${prospectId}`,
    );

    const response = await this.parent.axios.post<ListMembershipResponse>(url, data);

    return response.data;
  }

  public async update(
    listId: number,
    prospectId: number,
    update: UpdateListMembership,
  ): Promise<ListMembershipResponse> {
    const url = this.parent.getApiUrl(
      this.objectName,
      `update/list_id/${listId}/prospect_id/${prospectId}`,
    );

    const response = await this.parent.axios.post<ListMembershipResponse>(url, update);

    return response.data;
  }

  public async updateById(
    id: number,
    update: UpdateListMembership,
  ): Promise<ListMembershipResponse> {
    const url = this.parent.getApiUrl(this.objectName, `update/id/${id}`);

    const response = await this.parent.axios.post<ListMembershipResponse>(url, update);

    return response.data;
  }

  public async delete(listId: number, prospectId: number): Promise<void> {
    const url = this.parent.getApiUrl(
      this.objectName,
      `delete/list_id/${listId}/prospect_id/${prospectId}`,
    );

    await this.parent.axios.post(url);
  }

  public async deleteById(id: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, `delete/id/${id}`);

    await this.parent.axios.post(url);
  }
}
