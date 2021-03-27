import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';
export interface TagObject {
    id: number;
    tag_id: number;
    type: string;
    object_id: number;
    created_at: string;
}
declare type TagObjectType = 'Automation' | 'Block' | 'Campaign' | 'Competitor' | 'Prospect Custom Field' | 'Custom URL' | 'Drip Program' | 'Email' | 'Email Draft' | 'Email Template' | 'Email Template Draft' | 'File' | 'Form' | 'Form Field' | 'Form Handler' | 'Group' | 'Keyword' | 'Landing Page' | 'Layout Template' | 'List' | 'Opportunity' | 'Paid Search Campaign' | 'Personalization' | 'Profile' | 'Prospect' | 'Prospect Default Account' | 'Segmentation Rule' | 'Site' | 'Site Search' | 'Social Message' | 'User' | 'Dynamic Content';
declare type TagObjectSearchParams = {
    tag_id?: number;
    type?: TagObjectType;
    object_id?: number;
} & IdSearchParams & CreatedSearchParams;
interface TagObjectResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
export declare type TagObjectQueryParams = TagObjectSearchParams & TagObjectResultParams;
export interface TagObjectQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        tagObject: TagObject | TagObject[];
    };
}
export interface TagObjectResponse extends ResponseBase {
    tagObject: TagObject;
}
export default class TagObjects extends ObjectsBase {
    objectName: string;
    query(params?: TagObjectQueryParams): Promise<TagObjectQueryResponse>;
    read(id: number): Promise<TagObjectResponse>;
}
export {};
