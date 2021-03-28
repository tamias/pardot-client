import {
  BaseResultParams,
  CreatedSearchParams,
  IdSearchParams,
  ResponseBase,
  UpdatedSearchParams,
} from './types';
import ObjectsBase from './base';

export interface Form {
  id: number;
  name: string;
  campaign: {
    id: number;
    name: string;
  };
  embedCode: string;
  created_at: string;
  updated_at: string;
}

type FormSearchParams = IdSearchParams & CreatedSearchParams & UpdatedSearchParams;

interface FormResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

type FormQueryParams = FormSearchParams & FormResultParams;

export interface FormQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    form: Form | Form[];
  };
}

export interface FormResponse extends ResponseBase {
  form: Form;
}

export default class Forms extends ObjectsBase {
  objectName = 'form';

  public async query(params?: FormQueryParams): Promise<FormQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<FormQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<FormResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<FormResponse>(url);

    return response.data;
  }
}
