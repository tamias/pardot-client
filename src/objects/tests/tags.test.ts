import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import Tags, { TagQueryParams, TagQueryResponse, TagResponse } from '../tags';

describe('Tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const tags = new Tags(pardot);

  const mockTags = [
    {
      created_at: '',
      id: 1,
      name: 'tag1',
      updated_at: '',
    },
    {
      created_at: '',
      id: 2,
      name: 'tag2',
      updated_at: '',
    },
  ];

  const mockTagsResponse: TagQueryResponse = {
    ...responseAttributes,
    result: {
      tag: mockTags,
      total_results: 5,
    },
  };

  const mockTagResponse: TagResponse = {
    ...responseAttributes,
    tag: mockTags[0],
  };

  describe('query', () => {
    it('should make a get request to query tags', async () => {
      mockAxios.onGet().reply<TagQueryResponse>(200, mockTagsResponse);

      const params: TagQueryParams = {
        limit: 2,
      };

      const response = await tags.query(params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/tag/version/4/do/query', {
        params,
      });

      expect(response).toEqual(mockTagsResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a tag', async () => {
      const id = 1;

      mockAxios.onGet().reply<TagResponse>(200, mockTagResponse);

      const response = await tags.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/tag/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockTagResponse);
    });
  });
});
