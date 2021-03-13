import { BaseResultParams, Create, CreatedSearchParams, IdSearchParams, ResponseBase, Update, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface List {
    id: number;
    name: string;
    is_public: boolean;
    is_dynamic: boolean;
    title: string | null;
    description: string | null;
    is_crm_visible: boolean;
    created_at: string;
    updated_at: string;
}
declare type ListSearchParams = {
    name?: string;
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface ListResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}
export declare type UpdateList = Update<List>;
export declare type CreateList = Create<List>;
export interface ListQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        list: List | List[];
    };
}
export interface ListResponse extends ResponseBase {
    list: List;
}
export default class Lists extends ObjectsBase {
    objectName: string;
    query(params?: ListSearchParams & ListResultParams): Promise<ListQueryResponse>;
    read(id: number): Promise<ListResponse>;
    update(id: number, update: UpdateList): Promise<ListResponse>;
    create(data: CreateList): Promise<ListResponse>;
    delete(id: number): Promise<void>;
}
export {};
