import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import Forms, { FormQueryResponse, FormResponse } from '../forms';

describe('Forms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const forms = new Forms(pardot);

  describe('query', () => {
    it('should make a get request to query forms', async () => {
      const mockResponse: FormQueryResponse = {
        ...responseAttributes,
        result: {
          form: [
            {
              campaign: { id: 11, name: 'Campaign 1' },
              created_at: '',
              embedCode: '<iframe></iframe>',
              id: 1,
              name: 'Form 1',
              updated_at: '',
            },
            {
              campaign: { id: 12, name: 'Campaign 2' },
              created_at: '',
              embedCode: '<iframe></iframe>',
              id: 2,
              name: 'Form 2',
              updated_at: '',
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<FormQueryResponse>(200, mockResponse);

      const params = {
        id_greater_than: 40,
        limit: 2,
      };

      const response = await forms.query(params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/form/version/4/do/query', {
        params,
      });

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get query to read a form', async () => {
      const id = 1;

      const mockResponse: FormResponse = {
        ...responseAttributes,
        form: {
          campaign: { id: 11, name: 'Campaign 1' },
          created_at: '',
          embedCode: '<iframe></iframe>',
          id: 1,
          name: 'Form 1',
          updated_at: '',
        },
      };

      mockAxios.onGet().reply<FormResponse>(200, mockResponse);

      const response = await forms.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/form/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
