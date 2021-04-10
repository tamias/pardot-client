import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import EmailTemplates, {
  EmailTemplateListResponse,
  EmailTemplateResponse,
} from '../email-templates';

describe('EmailTemplates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const emailTemplates = new EmailTemplates(pardot);

  const mockEmailTemplateResponse: EmailTemplateResponse = {
    ...responseAttributes,
    emailTemplate: {
      emailType: 0,
      error: 0,
      fromName: null,
      htmlMessage: '<p>Email!</p>',
      id: 1,
      isArchived: null,
      isAutoResponderEmail: 1,
      isDripEmail: 1,
      isListEmail: 1,
      isOneToOneEmail: 1,
      name: 'Email Template 1',
      sendOptions: {
        abVersion: null,
        isTest: null,
        replyToAddress: '[]',
        sendFromAccountOwner: null,
        sendFromData: '[[1,"Sender Name","sender@example.com"]]',
      },
      subject: 'Email Subject',
      textMessage: 'Email!',
      trackedHtmlMessage: '<p>Email!</p>',
      trackedTextMessage: 'Email!',
      type: 3,
    },
  };

  const mockEmailTemplateListResponse: EmailTemplateListResponse = {
    ...responseAttributes,
    emailTemplates: {
      count: 1,
      error: 0,
      templates: [
        {
          emailType: 0,
          fromName: null,
          id: 54462,
          isArchived: null,
          isAutoResponderEmail: 1,
          isDripEmail: 1,
          isListEmail: 1,
          isOneToOneEmail: 1,
          name: 'Test Template RJK',
          subject: 'RJK Test',
          type: 3,
        },
      ],
    },
  };

  describe('read', () => {
    it('should make a get request to read an email template', async () => {
      const id = 1;

      const params = { archived: true };

      mockAxios.onGet().reply<EmailTemplateResponse>(200, mockEmailTemplateResponse);

      const response = await emailTemplates.read(id, params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/emailTemplate/version/4/do/read/id/${id}`,
        {
          params,
        },
      );

      expect(response).toEqual(mockEmailTemplateResponse);
    });
  });

  describe('listOneToOne', () => {
    it('should make a get request to list one-to-one email templates', async () => {
      const params = { archived: true };

      mockAxios.onGet().reply<EmailTemplateListResponse>(200, mockEmailTemplateListResponse);

      const response = await emailTemplates.listOneToOne(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/emailTemplate/version/4/do/listOneToOne`,
        {
          params,
        },
      );

      expect(response).toEqual(mockEmailTemplateListResponse);
    });
  });
});
