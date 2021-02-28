import {
  BaseResultParameters,
  BaseSearchParameters,
  // CreateCustomField,
  CustomFieldQueryResponse,
  CustomFieldResponse,
  UpdateCustomField,
} from '../types';
import ObjectsBase from './objects-base';

type CustomFieldSearchParameters = BaseSearchParameters;

interface ResultParameters extends BaseResultParameters {
  sort_by?: 'created_at' | 'id' | 'name';
}

export default class CustomFields extends ObjectsBase {
  objectName = 'customField';

  public async query(
    params?: CustomFieldSearchParameters & ResultParameters,
  ): Promise<CustomFieldQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<CustomFieldQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<CustomFieldResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<CustomFieldResponse>(url);

    return response.data;
  }

  public async update(id: number, update: UpdateCustomField): Promise<CustomFieldResponse> {
    const url = this.parent.getApiUrl(this.objectName, `update/id/${id}`);

    const response = await this.parent.axios.post<CustomFieldResponse>(url, update);

    return response.data;
  }

  // TODO: Pardot API returns err code 10000 "Please provide a valid type for this field"
  //   despite passing apparently valid values for type
  // public async create(data: CreateCustomField): Promise<CustomFieldResponse> {
  //   const url = this.parent.getApiUrl(this.objectName, 'create');
  //
  //   const response = await this.parent.axios.post<CustomFieldResponse>(url, data);
  //
  //   return response.data;
  // }
  //
  // public async delete(id: number): Promise<void> {
  //   const url = this.parent.getApiUrl(this.objectName, `delete/id/${id}`);
  //
  //   await this.parent.axios.post(url);
  // }
}
