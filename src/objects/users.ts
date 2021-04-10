import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  job_title: string | null;
  role: string;
  account: number;
  timezone: string;
  created_at: string;
  updated_at: string;
}

type UserSearchParams = IdSearchParams & CreatedSearchParams;

interface UserResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

export type UserQueryParams = UserSearchParams & UserResultParams;

export interface UserQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    user?: User | User[];
  };
}

export interface UserResponse extends ResponseBase {
  user: User;
}

export default class Users extends ObjectsBase {
  objectName = 'user';

  public async query(params?: UserQueryParams): Promise<UserQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<UserQueryResponse>(url, { params });

    return response.data;
  }

  public async readById(id: number): Promise<UserResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<UserResponse>(url);

    return response.data;
  }

  public async readByEmail(email: string): Promise<UserResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'email', email]);

    const response = await this.parent.axios.get<UserResponse>(url);

    return response.data;
  }
}
