import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import DynamicContent, {
  DynamicContentQueryResponse,
  DynamicContentResponse,
} from '../dynamic-content';

describe('DynamicContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const dynamicContent = new DynamicContent(pardot);

  describe('query', () => {
    it('should make a get request to query dynamic content items', async () => {
      const mockResponse: DynamicContentQueryResponse = {
        ...responseAttributes,
        result: {
          dynamicContent: [
            {
              baseContent: '<p class="title">This is Dynamic Content</p>',
              basedOn: '',
              created_at: '',
              embedCode: '<script type="text/javascript" src></script>',
              embedUrl: 'http://www.example.com/embed.js',
              id: 1,
              name: 'Dynamic Content 1',
              updated_at: '',
              variation: [],
            },
            {
              baseContent: '<p class="title">This is More Dynamic Content</p>',
              basedOn: '',
              created_at: '',
              embedCode: '<script type="text/javascript" src></script>',
              embedUrl: 'http://www.example.com/embed.js',
              id: 2,
              name: 'Dynamic Content 1',
              updated_at: '',
              variation: [],
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<DynamicContentQueryResponse>(200, mockResponse);

      const params = {
        id_greater_than: 40,
        limit: 2,
      };

      const response = await dynamicContent.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/dynamicContent/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a dynamic content item', async () => {
      const id = 1;

      const mockResponse: DynamicContentResponse = {
        ...responseAttributes,
        dynamicContent: {
          baseContent: '<p class="title">This is Dynamic Content</p>',
          basedOn: 'Score',
          created_at: '',
          embedCode: '<script type="text/javascript" src></script>',
          embedUrl: 'http://www.example.com/embed.js',
          id: 1,
          name: 'Dynamic Content 1',
          updated_at: '',
          variation: {
            comparison: 'is 1',
            content: '<p class="title">This is a Variation</p>',
          },
        },
      };

      mockAxios.onGet().reply<DynamicContentResponse>(200, mockResponse);

      const response = await dynamicContent.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/dynamicContent/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
