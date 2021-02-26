import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken } from './types';
export default class Pardot {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    token: AccessToken;
    businessUnitId: string;
    baseUrl: string;
    apiVersion: number;
    oauthClient: AuthorizationCode;
    constructor({ clientId, clientSecret, redirectUri, token, businessUnitId, baseUrl, apiVersion, }: PardotProps);
    authorizeUrl(props?: AuthorizeUrlProps): string;
    getAccessToken(code: string): Promise<RawAccessToken>;
}
