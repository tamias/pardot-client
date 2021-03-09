import { ResponseBase } from './types';
import ObjectsBase from './base';
declare type Flag = 1 | 0 | null;
export declare type EmailTemplate = {
    error: 1;
    errorCode: number;
    errorMessage: string;
} | {
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
        templates?: EmailTemplateOneToOne[];
    };
}
export default class EmailTemplates extends ObjectsBase {
    objectName: string;
    read(id: number, params?: EmailTemplateParams): Promise<EmailTemplateResponse>;
    listOneToOne(params?: EmailTemplateParams): Promise<EmailTemplateListResponse>;
}
export {};
