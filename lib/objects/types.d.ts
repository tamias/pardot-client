declare type GnuDateString = string;
export declare type DateString = 'today' | 'yesterday' | 'last_7_days' | 'this_month' | 'last_month' | GnuDateString;
export interface BaseSearchParams {
    created_after?: DateString;
    created_before?: DateString;
    id_greater_than?: number;
    id_less_than?: number;
}
export declare type SortOrder = 'ascending' | 'descending';
export interface BaseResultParams {
    format?: 'json' | 'xml';
    limit?: number;
    offset?: number;
    sort_order?: SortOrder;
}
export interface ResponseAttributes {
    status: 'ok';
    version: number;
}
export interface ResponseBase {
    '@attributes': ResponseAttributes;
}
export declare type Update<T> = Partial<Omit<T, 'id'>>;
export {};
