import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase, UpdatedSearchParams } from './types';
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
declare type FormSearchParams = IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface FormResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
declare type FormQueryParams = FormSearchParams & FormResultParams;
export interface FormQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        form?: Form | Form[];
    };
}
export interface FormResponse extends ResponseBase {
    form: Form;
}
export default class Forms extends ObjectsBase {
    objectName: string;
    query(params?: FormQueryParams): Promise<FormQueryResponse>;
    read(id: number): Promise<FormResponse>;
}
export {};
