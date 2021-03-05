import { BaseResultParameters, BaseSearchParameters, DateString, ResponseBase } from './types';
import ObjectsBase from './base';
interface CustomRedirectSearchParameters extends BaseSearchParameters {
    updated_before?: DateString;
    updated_after?: DateString;
}
interface CustomRedirectResultParameters extends BaseResultParameters {
    sort_by?: 'created_at' | 'id';
}
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
export interface CustomRedirectQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        customRedirect: CustomRedirect | CustomRedirect[];
    };
}
export interface CustomRedirectResponse extends ResponseBase {
    customRedirect: CustomRedirect;
}
export default class CustomRedirects extends ObjectsBase {
    objectName: string;
    query(params?: CustomRedirectSearchParameters & CustomRedirectResultParameters): Promise<CustomRedirectQueryResponse>;
    read(id: number): Promise<CustomRedirectResponse>;
}
export {};
