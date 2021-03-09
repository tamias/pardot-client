import { ResponseBase } from './types';
import ObjectsBase from './base';

type Flag = 1 | 0 | null;

export type EmailTemplate =
  | {
      // Assuming error is 1 if an error occurred; not sure how to trigger this
      error: 1;
      errorCode: number;
      errorMessage: string;
    }
  | {
      error: 0;
      sendOptions: {
        sendFromAccountOwner: Flag;
        isTest: Flag;
        replyToAddress: string;
        sendFromData: string;
        abVersion: unknown | null;
      };
      id: number;
      name: string;
      htmlMessage: string;
      textMessage: string;
      trackedHtmlMessage: string;
      trackedTextMessage: string;
      fromName: string | null;
      isOneToOneEmail: Flag;
      isArchived: Flag;
      isAutoResponderEmail: Flag;
      isDripEmail: Flag;
      isListEmail: Flag;
      subject: string;
      emailType: number;
      type: number;
    };

export interface EmailTemplateOneToOne {
  id: number;
  name: string;
  fromName: string | null;
  isOneToOneEmail: Flag;
  isArchived: Flag;
  isAutoResponderEmail: Flag;
  isDripEmail: Flag;
  isListEmail: Flag;
  subject: string;
  emailType: number;
  type: number;
}

interface EmailTemplateParams {
  archived?: boolean;
}

export interface EmailTemplateResponse extends ResponseBase {
  emailTemplate: EmailTemplate;
}

export interface EmailTemplateListResponse extends ResponseBase {
  emailTemplates: {
    error: number;
    count: number;
    // if present, will be a list even if only one item
    templates?: EmailTemplateOneToOne[];
  };
}

export default class EmailTemplates extends ObjectsBase {
  objectName = 'emailTemplate';

  public async read(id: number, params?: EmailTemplateParams): Promise<EmailTemplateResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<EmailTemplateResponse>(url, { params });

    return response.data;
  }

  public async listOneToOne(params?: EmailTemplateParams): Promise<EmailTemplateListResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'listOneToOne');

    const response = await this.parent.axios.get<EmailTemplateListResponse>(url, { params });

    return response.data;
  }
}
