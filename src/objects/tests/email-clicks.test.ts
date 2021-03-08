import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import EmailClicks, { EmailClickQueryResponse } from '../email-clicks';

describe('EmailClicks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const emailClicks = new EmailClicks(pardot);

  describe('query', () => {
    it('should make a get request to query email clicks', async () => {
      const mockResponse: EmailClickQueryResponse = {
        ...responseAttributes,
        result: {
          emailClick: [
            {
              created_at: '',
              id: 1,
              prospect_id: 11,
              url: 'https://www.example.com/click',
            },
            {
              created_at: '',
              id: 2,
              prospect_id: 12,
              url: 'https://www.example.com/click',
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<EmailClickQueryResponse>(200, mockResponse);

      const params = {
        id_less_than: 10,
        limit: 2,
      };

      const response = await emailClicks.query(params);

      expect(
        onGetSpy,
      ).toHaveBeenCalledWith('https://pi.pardot.com/api/emailClick/version/4/do/query', { params });

      expect(response).toEqual(mockResponse);
    });
  });
});
