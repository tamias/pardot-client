export interface RawAccessToken {
    access_token: string;
    refresh_token: string;
    [key: string]: string;
}
export interface PardotProps {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    token?: RawAccessToken;
    businessUnitId: string;
    baseUrl?: string;
    apiVersion?: number;
}
export interface AuthorizeUrlProps {
    state?: string;
    scope?: string | string[];
}
declare type GnuDateString = string;
declare type DateString = 'today' | 'yesterday' | 'last_7_days' | 'this_month' | 'last_month' | GnuDateString;
export interface BaseSearchParameters {
    created_after?: DateString;
    created_before?: DateString;
    id_greater_than?: number;
    id_less_than?: number;
    updated_before?: DateString;
    updated_after?: DateString;
}
export declare type SortOrder = 'ascending' | 'descending';
export interface Campaign {
    id: number;
    name: string;
    cost: number | null;
}
declare type Update<T> = Partial<Omit<T, 'id'>>;
export declare type UpdateCampaign = Update<Campaign>;
export declare type CreateCampaign = UpdateCampaign & Pick<Campaign, 'name'>;
export interface ResponseAttributes {
    status: 'ok';
    version: number;
}
export interface ResponseBase {
    '@attributes': ResponseAttributes;
}
export interface CampaignQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        campaign: Campaign | Campaign[];
    };
}
export interface CampaignResponse extends ResponseBase {
    campaign: Campaign;
}
export {};
