import { BaseResultParams, Create, CreatedSearchParams, IdSearchParams, ResponseBase, Update, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface ListMembership {
    id: number;
    list_id: number;
    prospect_id: number;
    opted_out: boolean;
    created_at: string;
    updated_at: string;
}
declare type ListMembershipSearchParams = {
    deleted?: boolean;
    list_id?: number;
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface ListMembershipResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
export declare type ListMembershipQueryParams = ListMembershipSearchParams & ListMembershipResultParams;
export declare type UpdateListMembership = Update<ListMembership>;
export declare type CreateListMembership = Create<ListMembership>;
export interface ListMembershipQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        list_membership: ListMembership | ListMembership[];
    };
}
export interface ListMembershipResponse extends ResponseBase {
    list_membership: ListMembership;
}
export default class ListMemberships extends ObjectsBase {
    objectName: string;
    query(params?: ListMembershipQueryParams): Promise<ListMembershipQueryResponse>;
    read(listId: number, prospectId: number): Promise<ListMembershipResponse>;
    readById(id: number): Promise<ListMembershipResponse>;
    create(listId: number, prospectId: number, data: CreateListMembership): Promise<ListMembershipResponse>;
    update(listId: number, prospectId: number, update: UpdateListMembership): Promise<ListMembershipResponse>;
    updateById(id: number, update: UpdateListMembership): Promise<ListMembershipResponse>;
    delete(listId: number, prospectId: number): Promise<void>;
    deleteById(id: number): Promise<void>;
}
export {};
