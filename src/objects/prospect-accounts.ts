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

export interface ProspectAccount {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  // custom fields
  [field: string]: unknown;
}

type ProspectAccountSearchParams = {
  name?: string;
} & IdSearchParams &
  CreatedSearchParams &
  UpdatedSearchParams;

interface ProspectAccountResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}

export type ProspectAccountQueryParams = ProspectAccountSearchParams & ProspectAccountResultParams;

export type UpdateProspectAccount = Update<ProspectAccount>;
export type CreateProspectAccount = Create<ProspectAccount, 'name'>;

export interface ProspectAccountQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    prospectAccount?: ProspectAccount | ProspectAccount[];
  };
}

interface ProspectAccountFieldAttributes {
  id: string;
  label: string;
  required: boolean;
  custom: boolean;
  type: string; // text, textarea, dropdown...
  has_options: boolean;
}

interface ProspectAccountNoOptionsField {
  '@attributes': ProspectAccountFieldAttributes & {
    has_options: false;
  };
}

interface ProspectAccountOptionsField {
  '@attributes': ProspectAccountFieldAttributes & {
    has_options: true;
  };
  options: string[];
}

type ProspectAccountField = ProspectAccountNoOptionsField | ProspectAccountOptionsField;

export interface ProspectAccountDescribeResponse extends ResponseBase {
  result: {
    field: ProspectAccountField[];
  };
}

export interface ProspectAccountResponse extends ResponseBase {
  prospectAccount: ProspectAccount;
}

export default class ProspectAccounts extends ObjectsBase {
  objectName = 'prospectAccount';

  public async query(params?: ProspectAccountQueryParams): Promise<ProspectAccountQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<ProspectAccountQueryResponse>(url, { params });

    return response.data;
  }

  public async describe(): Promise<ProspectAccountDescribeResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['describe']);

    const response = await this.parent.axios.get<ProspectAccountDescribeResponse>(url);

    return response.data;
  }

  public async read(id: number): Promise<ProspectAccountResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<ProspectAccountResponse>(url);

    return response.data;
  }

  public async create(data: CreateProspectAccount): Promise<ProspectAccountResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['create']);

    const response = await this.parent.axios.post<ProspectAccountResponse>(url, data);

    return response.data;
  }

  public async update(id: number, update: UpdateProspectAccount): Promise<ProspectAccountResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['update', 'id', id]);

    const response = await this.parent.axios.post<ProspectAccountResponse>(url, update);

    return response.data;
  }

  // TODO - what does assign return?
  public async assign(id: number, userId: number): Promise<ProspectAccountResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['assign', 'id', id]);

    const response = await this.parent.axios.post<ProspectAccountResponse>(url, {
      user_id: userId,
    });

    return response.data;
  }
}
