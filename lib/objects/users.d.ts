import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';
export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    job_title: string | null;
    role: string;
    account: number;
    timezone: string;
    created_at: string;
    updated_at: string;
}
declare type UserSearchParams = IdSearchParams & CreatedSearchParams;
interface UserResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
export declare type UserQueryParams = UserSearchParams & UserResultParams;
export interface UserQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        user?: User | User[];
    };
}
export interface UserResponse extends ResponseBase {
    user: User;
}
export default class Users extends ObjectsBase {
    objectName: string;
    query(params?: UserQueryParams): Promise<UserQueryResponse>;
    readById(id: number): Promise<UserResponse>;
    readByEmail(email: string): Promise<UserResponse>;
}
export {};
