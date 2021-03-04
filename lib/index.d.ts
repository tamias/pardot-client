import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken } from './types';
import Accounts from './objects/accounts';
import { AxiosInstance } from 'axios';
import Campaigns from './objects/campaigns';
import CustomFields from './objects/custom-fields';
export default class PardotClient {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    token?: AccessToken;
    businessUnitId: string;
    baseUrl: string;
    apiVersion: number;
    oauthClient: AuthorizationCode;
    axiosInstance?: AxiosInstance;
    accounts: Accounts;
    campaigns: Campaigns;
    customFields: CustomFields;
    constructor({ clientId, clientSecret, redirectUri, token, businessUnitId, baseUrl, apiVersion, }: PardotProps);
    authorizeUrl(props?: AuthorizeUrlProps): string;
    getAccessToken(code: string): Promise<RawAccessToken>;
    get axios(): AxiosInstance;
    getApiUrl(object: string, path: string): string;
}
