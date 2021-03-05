import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import CustomRedirects, {
  CustomRedirectQueryResponse,
  CustomRedirectResponse,
} from '../custom-redirects';

describe('CustomRedirects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const customRedirects = new CustomRedirects(pardot);

  describe('query', () => {
    it('should make a get request to query custom redirects', async () => {
      const mockResponse: CustomRedirectQueryResponse = {
        ...responseAttributes,
        result: {
          customRedirect: [
            {
              campaign: {
                id: 11,
                name: 'Campaign 1',
              },
              created_at: '',
              destination_url: 'https://www.example.com/destination_url',
              id: 1,
              name: 'Custom Redirect 1',
              updated_at: '',
              url: 'https://www.example.com/url',
            },
            {
              campaign: {
                id: 12,
                name: 'Campaign 2',
              },
              created_at: '',
              destination_url: 'https://www.example.com/destination_url',
              id: 2,
              name: 'Custom Redirect 2',
              updated_at: '',
              url: 'https://www.example.com/url',
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<CustomRedirectQueryResponse>(200, mockResponse);

      const params = {
        id_greater_than: 40,
        limit: 2,
      };

      const response = await customRedirects.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/customRedirect/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a custom redirect', async () => {
      const id = 1;

      const mockResponse: CustomRedirectResponse = {
        ...responseAttributes,
        customRedirect: {
          campaign: {
            id: 11,
            name: 'Campaign 1',
          },
          created_at: '',
          destination_url: 'https://www.example.com/destination_url',
          id: 1,
          name: 'Custom Redirect 1',
          updated_at: '',
          url: 'https://www.example.com/url',
        },
      };

      mockAxios.onGet().reply<CustomRedirectResponse>(200, mockResponse);

      const response = await customRedirects.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/customRedirect/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
