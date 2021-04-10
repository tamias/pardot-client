import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface CustomRedirect {
    id: number;
    name: string;
    url: string;
    destination_url: string;
    campaign: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}
declare type CustomRedirectSearchParams = IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface CustomRedirectResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
export declare type CustomRedirectQueryParams = CustomRedirectSearchParams & CustomRedirectResultParams;
export interface CustomRedirectQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        customRedirect?: CustomRedirect | CustomRedirect[];
    };
}
export interface CustomRedirectResponse extends ResponseBase {
    customRedirect: CustomRedirect;
}
export default class CustomRedirects extends ObjectsBase {
    objectName: string;
    query(params?: CustomRedirectQueryParams): Promise<CustomRedirectQueryResponse>;
    read(id: number): Promise<CustomRedirectResponse>;
}
export {};
