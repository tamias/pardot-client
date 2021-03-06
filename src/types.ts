export interface RawAccessToken {
  access_token: string;
  refresh_token: string;
  [key: string]: string;
}

export type RefreshCallback = (token: RawAccessToken) => void | Promise<void>;

export interface PardotProps {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  token?: RawAccessToken;
  businessUnitId: string;
  baseUrl?: string;
  apiVersion?: number;
  refreshCallback?: RefreshCallback;
}

export interface AuthorizeUrlProps {
  state?: string;
  scope?: string | string[];
}
