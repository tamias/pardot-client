import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken, RefreshCallback } from './types';
import { stringify } from 'qs';
import Accounts from './objects/accounts';
import axios, { AxiosInstance } from 'axios';
import Campaigns from './objects/campaigns';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import CustomFields from './objects/custom-fields';
import CustomRedirects from './objects/custom-redirects';
import DynamicContent from './objects/dynamic-content';
import EmailClicks from './objects/email-clicks';
import Emails from './objects/emails';
import EmailTemplates from './objects/email-templates';
import Forms from './objects/forms';
import LifecycleHistories from './objects/lifecycle-histories';
import LifecycleStages from './objects/lifecycle-stages';
import ListMemberships from './objects/list-memberships';
import Lists from './objects/lists';
import Opportunities from './objects/opportunities';
import ProspectAccounts from './objects/prospect-accounts';
import Prospects from './objects/prospects';
import TagObjects from './objects/tag-objects';
import Tags from './objects/tags';
import Users from './objects/users';
import VisitorActivities from './objects/visitor-activities';
import Visitors from './objects/visitors';
import Visits from './objects/visits';

export default class PardotClient {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  businessUnitId: string;
  baseUrl: string;
  apiVersion: number;
  refreshCallback?: RefreshCallback;
  oauthClient: AuthorizationCode;

  private accessToken?: AccessToken;
  private axiosInstance?: AxiosInstance;

  accounts: Accounts;
  campaigns: Campaigns;
  customFields: CustomFields;
  customRedirects: CustomRedirects;
  dynamicContent: DynamicContent;
  emails: Emails;
  emailClicks: EmailClicks;
  emailTemplates: EmailTemplates;
  forms: Forms;
  lifecycleHistories: LifecycleHistories;
  lifecycleStages: LifecycleStages;
  lists: Lists;
  listMemberships: ListMemberships;
  opportunities: Opportunities;
  prospects: Prospects;
  prospectAccounts: ProspectAccounts;
  tags: Tags;
  tagObjects: TagObjects;
  users: Users;
  visitors: Visitors;
  visitorActivities: VisitorActivities;
  visits: Visits;

  public constructor({
    clientId,
    clientSecret,
    redirectUri,
    token,
    businessUnitId,
    baseUrl,
    apiVersion,
    refreshCallback,
  }: PardotProps) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.businessUnitId = businessUnitId;
    this.baseUrl = baseUrl ?? 'https://pi.pardot.com';
    this.refreshCallback = refreshCallback;
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
      this.accessToken = this.oauthClient.createToken(token);
    }

    this.accounts = new Accounts(this);
    this.campaigns = new Campaigns(this);
    this.customFields = new CustomFields(this);
    this.customRedirects = new CustomRedirects(this);
    this.dynamicContent = new DynamicContent(this);
    this.emails = new Emails(this);
    this.emailClicks = new EmailClicks(this);
    this.emailTemplates = new EmailTemplates(this);
    this.forms = new Forms(this);
    this.lifecycleHistories = new LifecycleHistories(this);
    this.lifecycleStages = new LifecycleStages(this);
    this.lists = new Lists(this);
    this.listMemberships = new ListMemberships(this);
    this.opportunities = new Opportunities(this);
    this.prospects = new Prospects(this);
    this.prospectAccounts = new ProspectAccounts(this);
    this.tags = new Tags(this);
    this.tagObjects = new TagObjects(this);
    this.users = new Users(this);
    this.visitors = new Visitors(this);
    this.visitorActivities = new VisitorActivities(this);
    this.visits = new Visits(this);
  }

  public authorizeUrl(props?: AuthorizeUrlProps): string {
    return this.oauthClient.authorizeURL({ ...props, redirect_uri: this.redirectUri });
  }

  public get token(): AccessToken {
    if (!this.accessToken) {
      throw new Error('Attempt to use missing token');
    }

    return this.accessToken;
  }

  public async getAccessToken(code: string): Promise<RawAccessToken> {
    this.accessToken = await this.oauthClient.getToken({ code, redirect_uri: this.redirectUri });
    // simple-oauth2 defines AccessToken['token'] as { [x: string]: any; }
    // assume that Pardot will return a response containing the expected fields
    return this.token.token as RawAccessToken;
  }

  protected convertRequestValues(
    data: { [key: string]: unknown },
    isQueryParams: boolean,
  ): { [key: string]: unknown } {
    // When creating or updating objects, false is stored as true,
    // presumably because the API is treating the value as a string rather than a boolean
    // As a workaround, pass booleans as 1 or 0 instead
    return Object.entries(data).reduce((acc, [key, value]) => {
      let updatedValue;
      if (typeof value === 'boolean') {
        updatedValue = isQueryParams ? value : +value;
      } else if (isQueryParams && Array.isArray(value)) {
        updatedValue = value.join(',');
      } else {
        updatedValue = value;
      }
      return {
        ...acc,
        [key]: updatedValue,
      };
    }, {});
  }

  public get axios(): AxiosInstance {
    if (!this.axiosInstance) {
      if (!this.accessToken) {
        throw new Error('Cannot instantiate axios without token');
      }

      this.axiosInstance = axios.create();

      this.axiosInstance.interceptors.request.use((config) => {
        let { data, params } = config;

        if (data && typeof data === 'object') {
          data = stringify(this.convertRequestValues(data, false));
        }

        if (params && typeof params === 'object') {
          params = this.convertRequestValues(params, true);
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
            ...params,
          },
        };
      });

      createAuthRefreshInterceptor(this.axiosInstance, async (failedRequest) => {
        // Pardot apparently does not include the refresh token in the refresh response,
        // so create a new AccessToken with the refresh token included

        const newToken = await this.token.refresh();
        this.accessToken = this.oauthClient.createToken({
          refresh_token: this.token.token.refresh_token,
          ...newToken.token,
        });

        await this.refreshCallback?.(this.token.token as RawAccessToken);
        failedRequest.config.headers['Authorization'] = `Bearer ${this.token.token.access_token}`;
      });
    }

    return this.axiosInstance;
  }

  public getApiUrl(object: string, pathParts: (string | number)[]): string {
    return (
      `${this.baseUrl}/api/${object}/version/${this.apiVersion}/do/` +
      pathParts.map(encodeURIComponent).join('/')
    );
  }
}
