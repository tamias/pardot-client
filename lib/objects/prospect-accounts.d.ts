import { BaseResultParams, Create, CreatedSearchParams, IdSearchParams, ResponseBase, Update, UpdatedSearchParams } from './types';
import ObjectsBase from './base';
export interface ProspectAccount {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    [field: string]: unknown;
}
declare type ProspectAccountSearchParams = {
    name?: string;
} & IdSearchParams & CreatedSearchParams & UpdatedSearchParams;
interface ProspectAccountResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}
export declare type ProspectAccountQueryParams = ProspectAccountSearchParams & ProspectAccountResultParams;
export declare type UpdateProspectAccount = Update<ProspectAccount>;
export declare type CreateProspectAccount = Create<ProspectAccount, 'name'>;
export interface ProspectAccountQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        prospectAccount: ProspectAccount | ProspectAccount[];
    };
}
interface ProspectAccountFieldAttributes {
    id: string;
    label: string;
    required: boolean;
    custom: boolean;
    type: string;
    has_options: boolean;
}
interface ProspectAccountNoOptionsField {
    '@attributes': ProspectAccountFieldAttributes & {
        has_options: false;
    };
}
interface ProspectAccountOptionsField {
    '@attributes': ProspectAccountFieldAttributes & {
        has_options: true;
    };
    options: string[];
}
declare type ProspectAccountField = ProspectAccountNoOptionsField | ProspectAccountOptionsField;
export interface ProspectAccountDescribeResponse extends ResponseBase {
    result: {
        field: ProspectAccountField[];
    };
}
export interface ProspectAccountResponse extends ResponseBase {
    prospectAccount: ProspectAccount;
}
export default class ProspectAccounts extends ObjectsBase {
    objectName: string;
    query(params?: ProspectAccountQueryParams): Promise<ProspectAccountQueryResponse>;
    describe(): Promise<ProspectAccountDescribeResponse>;
    read(id: number): Promise<ProspectAccountResponse>;
    create(data: CreateProspectAccount): Promise<ProspectAccountResponse>;
    update(id: number, update: UpdateProspectAccount): Promise<ProspectAccountResponse>;
    assign(id: number, userId: number): Promise<ProspectAccountResponse>;
}
export {};
