import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken } from './types';
import { AxiosInstance } from 'axios';
export default class Pardot {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    token?: AccessToken;
    businessUnitId: string;
    baseUrl: string;
    apiVersion: number;
    oauthClient: AuthorizationCode;
    axiosInstance?: AxiosInstance;
    constructor({ clientId, clientSecret, redirectUri, token, businessUnitId, baseUrl, apiVersion, }: PardotProps);
    authorizeUrl(props?: AuthorizeUrlProps): string;
    getAccessToken(code: string): Promise<RawAccessToken>;
    get axios(): AxiosInstance;
}
