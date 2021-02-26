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
