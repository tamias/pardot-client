import { AccessToken, AuthorizationCode } from 'simple-oauth2';
import { AuthorizeUrlProps, PardotProps, RawAccessToken, RefreshCallback } from './types';
import Accounts from './objects/accounts';
import { AxiosInstance } from 'axios';
import Campaigns from './objects/campaigns';
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
import Prospects from './objects/prospects';
export default class PardotClient {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    token?: AccessToken;
    businessUnitId: string;
    baseUrl: string;
    apiVersion: number;
    refreshCallback?: RefreshCallback;
    oauthClient: AuthorizationCode;
    axiosInstance?: AxiosInstance;
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
    constructor({ clientId, clientSecret, redirectUri, token, businessUnitId, baseUrl, apiVersion, refreshCallback, }: PardotProps);
    authorizeUrl(props?: AuthorizeUrlProps): string;
    getAccessToken(code: string): Promise<RawAccessToken>;
    get axios(): AxiosInstance;
    getApiUrl(object: string, path: string): string;
}
