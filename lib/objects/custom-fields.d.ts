import { BaseResultParams, Create, CreatedSearchParams, IdSearchParams, ResponseBase, Update } from './types';
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
declare type CustomFieldSearchParams = IdSearchParams & CreatedSearchParams;
interface CustomFieldResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'name';
}
export declare type CustomFieldQueryParams = CustomFieldSearchParams & CustomFieldResultParams;
export interface CustomFieldQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        customField?: CustomField | CustomField[];
    };
}
export interface CustomFieldResponse extends ResponseBase {
    customField: CustomField;
}
export declare type UpdateCustomField = Update<CustomField>;
export declare type CreateCustomField = Create<CustomField, 'name' | 'field_id'>;
export default class CustomFields extends ObjectsBase {
    objectName: string;
    query(params?: CustomFieldQueryParams): Promise<CustomFieldQueryResponse>;
    read(id: number): Promise<CustomFieldResponse>;
    update(id: number, update: UpdateCustomField): Promise<CustomFieldResponse>;
    create(data: CreateCustomField): Promise<CustomFieldResponse>;
    delete(id: number): Promise<void>;
}
export {};
