import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface Tag {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
declare type TagSearchParams = {
    name?: string;
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface TagResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}
export declare type TagQueryParams = TagSearchParams & TagResultParams;
export interface TagQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        tag?: Tag | Tag[];
    };
}
export interface TagResponse extends ResponseBase {
    tag: Tag;
}
export default class Tags extends ObjectsBase {
    objectName: string;
    query(params?: TagQueryParams): Promise<TagQueryResponse>;
    read(id: number): Promise<TagResponse>;
}
export {};
