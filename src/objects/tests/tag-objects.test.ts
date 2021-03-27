import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import TagObjects, {
  TagObjectQueryParams,
  TagObjectQueryResponse,
  TagObjectResponse,
} from '../tag-objects';

describe('TagObjects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const tagObjects = new TagObjects(pardot);

  const mockTagObjects = [
    {
      created_at: '',
      id: 1,
      object_id: 101,
      tag_id: 11,
      type: 'Prospect',
    },
    {
      created_at: '',
      id: 2,
      object_id: 102,
      tag_id: 12,
      type: 'Prospect',
    },
  ];

  const mockTagObjectsResponse: TagObjectQueryResponse = {
    ...responseAttributes,
    result: {
      tagObject: mockTagObjects,
      total_results: 5,
    },
  };

  const mockTagObjectResponse: TagObjectResponse = {
    ...responseAttributes,
    tagObject: mockTagObjects[0],
  };

  describe('query', () => {
    it('should make a get request to query tag objects', async () => {
      mockAxios.onGet().reply(200, mockTagObjectsResponse);

      const params: TagObjectQueryParams = {
        limit: 2,
      };

      const response = await tagObjects.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/tagObject/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockTagObjectsResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a tag object', async () => {
      const id = 1;

      mockAxios.onGet().reply<TagObjectResponse>(200, mockTagObjectResponse);

      const response = await tagObjects.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/tagObject/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockTagObjectResponse);
    });
  });
});
