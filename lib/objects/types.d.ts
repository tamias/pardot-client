import { DATE_STRINGS, OUTPUT_FORMATS, SORT_ORDERS } from './constants';
export declare type ValueOf<T> = T[keyof T];
declare type GnuDateString = string;
declare type DateStrings = typeof DATE_STRINGS;
export declare type DateString = ValueOf<DateStrings> | GnuDateString;
export interface IdSearchParams {
    id_greater_than?: number;
    id_less_than?: number;
}
export interface CreatedSearchParams {
    created_after?: DateString;
    created_before?: DateString;
}
export interface UpdatedSearchParams {
    updated_after?: DateString;
    updated_before?: DateString;
}
declare type SortOrders = typeof SORT_ORDERS;
export declare type SortOrder = ValueOf<SortOrders>;
export interface OutputParamsMobile {
    output: typeof OUTPUT_FORMATS.Mobile;
}
export interface OutputParamsSimple {
    output: typeof OUTPUT_FORMATS.Simple;
}
export interface OutputParamsFull {
    output?: typeof OUTPUT_FORMATS.Full;
}
export declare type OutputParams = OutputParamsMobile | OutputParamsSimple | OutputParamsFull;
export interface BaseResultParams {
    limit?: number;
    offset?: number;
    sort_order?: SortOrder;
    sort_by?: string;
}
export interface ResponseAttributes {
    stat: 'ok';
    version: number;
}
export interface ResponseBase {
    '@attributes': ResponseAttributes;
}
export declare type Update<ObjectType> = Partial<Omit<ObjectType, 'id'>>;
export declare type Create<ObjectType, Required extends keyof Update<ObjectType> | null = null> = Update<ObjectType> & (Required extends keyof Update<ObjectType> ? Pick<ObjectType, Required> : unknown);
export {};
