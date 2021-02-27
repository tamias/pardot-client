import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken } from './types';
import { stringify } from 'qs';
import axios, { AxiosInstance } from 'axios';
import Campaigns from './lib/campaigns';

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

  campaigns: Campaigns;

  public constructor({
    clientId,
    clientSecret,
    redirectUri,
    token,
    businessUnitId,
    baseUrl,
    apiVersion,
  }: PardotProps) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.businessUnitId = businessUnitId;
    this.baseUrl = baseUrl ?? 'https://pi.pardot.com';
    // default to v4 if no version is specified
    this.apiVersion = apiVersion ?? 4;

    this.oauthClient = new AuthorizationCode({
      auth: {
        authorizePath: '/services/oauth2/authorize',
        tokenHost: 'https://login.salesforce.com',
        tokenPath: '/services/oauth2/token',
      },
      client: {
        id: this.clientId,
        secret: this.clientSecret,
      },
    });

    if (token) {
      this.token = this.oauthClient.createToken(token);
    }

    this.campaigns = new Campaigns(this);
  }

  public authorizeUrl(props?: AuthorizeUrlProps): string {
    return this.oauthClient.authorizeURL({ ...props, redirect_uri: this.redirectUri });
  }

  public async getAccessToken(code: string): Promise<RawAccessToken> {
    this.token = await this.oauthClient.getToken({ code, redirect_uri: this.redirectUri });
    // simple-oauth2 defines AccessToken['token'] as { [x: string]: any; }
    // assume that Pardot will return a response containing the expected fields
    return this.token.token as RawAccessToken;
  }

  public get axios(): AxiosInstance {
    if (!this.axiosInstance) {
      if (!this.token) {
        throw new Error('Cannot instantiate axios without token');
      }

      this.axiosInstance = axios.create();
      this.axiosInstance.interceptors.request.use((config) => {
        let { data } = config;

        if (data && typeof data === 'object') {
          data = stringify(data);
        }
        return {
          ...config,
          data,
          headers: {
            Authorization: `Bearer ${this.token.token.access_token}`,
            'Pardot-Business-Unit-Id': this.businessUnitId,
            ...config.headers,
          },
          params: {
            format: 'json',
            ...config.params,
          },
        };
      });
    }

    return this.axiosInstance;
  }

  public getApiUrl(object: string, path: string): string {
    return `${this.baseUrl}/api/${object}/version/${this.apiVersion}/do/${path}`;
  }
}
