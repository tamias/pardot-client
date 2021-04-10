import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import EmailClicks, { EmailClick, EmailClickQueryResponse } from '../email-clicks';

describe('EmailClicks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const emailClicks = new EmailClicks(pardot);

  const mockEmailClicks: EmailClick[] = [
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
  ];

  const mockEmailClickQueryResponse: EmailClickQueryResponse = {
    ...responseAttributes,
    result: {
      emailClick: mockEmailClicks,
      total_results: 5,
    },
  };

  describe('query', () => {
    it('should make a get request to query email clicks', async () => {
      mockAxios.onGet().reply<EmailClickQueryResponse>(200, mockEmailClickQueryResponse);

      const params = {
        id_less_than: 10,
        limit: 2,
      };

      const response = await emailClicks.query(params);

      expect(
        onGetSpy,
      ).toHaveBeenCalledWith('https://pi.pardot.com/api/emailClick/version/4/do/query', { params });

      expect(response).toEqual(mockEmailClickQueryResponse);
    });
  });
});
