import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
interface DynamicContentVariation {
    comparison: string;
    content: string;
}
export interface DynamicContentItem {
    id: number;
    name: string;
    embedCode: string;
    embedUrl: string;
    baseContent: string;
    basedOn: string;
    variation: DynamicContentVariation | DynamicContentVariation[];
    created_at: string;
    updated_at: string;
}
declare type DynamicContentSearchParams = IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface DynamicContentResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
declare type DynamicContentQueryParams = DynamicContentSearchParams & DynamicContentResultParams;
export interface DynamicContentQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        dynamicContent: DynamicContentItem | DynamicContentItem[];
    };
}
export interface DynamicContentResponse extends ResponseBase {
    dynamicContent: DynamicContentItem;
}
export default class DynamicContent extends ObjectsBase {
    objectName: string;
    query(params?: DynamicContentQueryParams): Promise<DynamicContentQueryResponse>;
    read(id: number): Promise<DynamicContentResponse>;
}
export {};
