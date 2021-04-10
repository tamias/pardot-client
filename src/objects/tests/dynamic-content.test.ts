import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import DynamicContent, {
  DynamicContentItem,
  DynamicContentQueryResponse,
  DynamicContentResponse,
} from '../dynamic-content';

describe('DynamicContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const dynamicContent = new DynamicContent(pardot);

  const mockDynamicContentItems: DynamicContentItem[] = [
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
  ];

  const mockDynamicContentQueryResponse: DynamicContentQueryResponse = {
    ...responseAttributes,
    result: {
      dynamicContent: mockDynamicContentItems,
      total_results: 5,
    },
  };

  const mockDynamicContentResponse: DynamicContentResponse = {
    ...responseAttributes,
    dynamicContent: mockDynamicContentItems[0],
  };

  describe('query', () => {
    it('should make a get request to query dynamic content items', async () => {
      mockAxios.onGet().reply<DynamicContentQueryResponse>(200, mockDynamicContentQueryResponse);

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

      expect(response).toEqual(mockDynamicContentQueryResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a dynamic content item', async () => {
      const id = 1;

      mockAxios.onGet().reply<DynamicContentResponse>(200, mockDynamicContentResponse);

      const response = await dynamicContent.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/dynamicContent/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockDynamicContentResponse);
    });
  });
});
