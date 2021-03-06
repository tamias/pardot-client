import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import Emails, { EmailResponse, EmailSendParams, EmailStatsResponse } from '../emails';

describe('Emails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const emails = new Emails(pardot);

  describe('read', () => {
    it('should make a get request to read an email', async () => {
      const id = 1;

      const mockResponse: EmailResponse = {
        ...responseAttributes,
        email: {
          created_at: '',
          id: 1,
          message: 'Hello!',
          name: 'Email 1',
          subject: 'Subject',
        },
      };

      mockAxios.onGet().reply<EmailResponse>(200, mockResponse);

      const response = await emails.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/email/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('stats', () => {
    it('should make a get request to retrieve email stats', async () => {
      const id = 1;

      const mockResponse: EmailStatsResponse = {
        ...responseAttributes,
        stats: {
          click_open_ratio: 0.5,
          click_through_rate: 10,
          delivered: 190,
          delivery_rate: 95,
          hard_bounced: 4,
          opens: 40,
          opens_rate: 20,
          opt_outs: 10,
          out_out_rate: 5,
          sent: 200,
          soft_bounced: 6,
          spam_complaint_rate: 1,
          spam_complaints: 2,
          total_clicks: 20,
          unique_click_through_rate: 7,
          unique_clicks: 14,
          unique_opens: 30,
        },
      };

      mockAxios.onGet().reply<EmailStatsResponse>(200, mockResponse);

      const response = await emails.stats(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/email/version/4/do/stats/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('sendToEmail', () => {
    it('should make a post request to send an email to a prospect specified by email address', async () => {
      const prospectEmail = 'prospect@example.com';

      const params: EmailSendParams = {
        campaign_id: 2,
        email_template_id: 3,
      };

      const mockResponse: EmailResponse = {
        ...responseAttributes,
        email: {
          created_at: '',
          id: 1,
          message: 'Hello!',
          name: 'Email 1',
          subject: 'Subject',
        },
      };

      mockAxios.onPost().reply<EmailResponse>(200, mockResponse);

      const response = await emails.sendToEmail(prospectEmail, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/email/version/4/do/send/prospect_email/${prospectEmail}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('sendToId', () => {
    it('should make a post request to send an email to a prospect specified by id', async () => {
      const prospectId = 1;

      const params: EmailSendParams = {
        campaign_id: 2,
        from_email: 'sender@example.com',
        from_name: 'Sender',
        name: 'Email',
        subject: 'Hello',
        text_content: 'Hello World!',
      };

      const mockResponse: EmailResponse = {
        ...responseAttributes,
        email: {
          created_at: '',
          id: 1,
          message: 'Hello!',
          name: 'Email 1',
          subject: 'Subject',
        },
      };

      mockAxios.onPost().reply<EmailResponse>(200, mockResponse);

      const response = await emails.sendToId(prospectId, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/email/version/4/do/send/prospect_id/${prospectId}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('sendToLists', () => {
    it('should make a post request to send an email to specified lists', async () => {
      const listIds = [10, 11];

      const params: EmailSendParams = {
        campaign_id: 2,
        from_user_id: 5,
        name: 'Email',
        subject: 'Hello',
        text_content: 'Hello World!',
      };

      const mockResponse: EmailResponse = {
        ...responseAttributes,
        email: {
          created_at: '',
          id: 1,
          message: 'Hello!',
          name: 'Email 1',
          subject: 'Subject',
        },
      };

      mockAxios.onPost().reply<EmailResponse>(200, mockResponse);

      const response = await emails.sendToLists(listIds, params);

      expect(onPostSpy).toHaveBeenCalledWith(`https://pi.pardot.com/api/email/version/4/do/send`, {
        ...params,
        list_ids: listIds,
      });

      expect(response).toEqual(mockResponse);
    });
  });
});
