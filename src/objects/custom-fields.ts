import {
  BaseResultParams,
  Create,
  CreatedSearchParams,
  IdSearchParams,
  ResponseBase,
  Update,
} from './types';
import ObjectsBase from './base';

export interface CustomField {
  id: number;
  name: string | null;
  field_id: string | null;
  type: string | null;
  type_id: number | null;
  created_at: string;
  updated_at: string;
  is_record_multiple_responses: boolean;
  crm_id: string | null;
  is_use_values: boolean;
  is_analytics_synced: boolean;
}

type CustomFieldSearchParams = IdSearchParams & CreatedSearchParams;

interface CustomFieldResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id' | 'name';
}

export type CustomFieldQueryParams = CustomFieldSearchParams & CustomFieldResultParams;

export interface CustomFieldQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    customField?: CustomField | CustomField[];
  };
}

export interface CustomFieldResponse extends ResponseBase {
  customField: CustomField;
}

export type UpdateCustomField = Update<CustomField>;
export type CreateCustomField = Create<CustomField, 'name' | 'field_id'>;

export default class CustomFields extends ObjectsBase {
  objectName = 'customField';

  public async query(params?: CustomFieldQueryParams): Promise<CustomFieldQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<CustomFieldQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<CustomFieldResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<CustomFieldResponse>(url);

    return response.data;
  }

  public async update(id: number, update: UpdateCustomField): Promise<CustomFieldResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['update', 'id', id]);

    const response = await this.parent.axios.post<CustomFieldResponse>(url, update);

    return response.data;
  }

  // TODO: determine how to specify type;
  //   Pardot API returns err code 10000 "Please provide a valid type for this field"
  //   despite passing apparently valid values for type
  //   (Not specifying type works, creating a text field)
  public async create(data: CreateCustomField): Promise<CustomFieldResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['create']);

    const response = await this.parent.axios.post<CustomFieldResponse>(url, data);

    return response.data;
  }

  public async delete(id: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, ['delete', 'id', id]);

    await this.parent.axios.post(url);
  }
}
