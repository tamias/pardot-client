import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken } from './types';
import axios, { AxiosInstance } from 'axios';

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
        tokenHost: 'https://login.salesforce.com/services/',
      },
      client: {
        id: this.clientId,
        secret: this.clientSecret,
      },
    });

    if (token) {
      this.token = this.oauthClient.createToken(token);
    }
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
      this.axiosInstance.interceptors.request.use((config) => ({
        ...config,
        headers: {
          Authorization: `Bearer ${this.token.token.access_token}`,
          'Pardot-Business-Unit-Id': this.businessUnitId,
          ...config.headers,
        },
        params: {
          format: 'json',
          ...config.params,
        },
      }));
    }

    return this.axiosInstance;
  }
}
