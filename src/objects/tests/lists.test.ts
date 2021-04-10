import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import Lists, { List, ListQueryResponse, ListResponse } from '../lists';

describe('Lists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const lists = new Lists(pardot);

  const mockLists: List[] = [
    {
      created_at: '',
      description: null,
      id: 1,
      is_crm_visible: false,
      is_dynamic: false,
      is_public: true,
      name: 'List 1',
      title: 'List Title',
      updated_at: '',
    },
    {
      created_at: '',
      description: null,
      id: 2,
      is_crm_visible: false,
      is_dynamic: true,
      is_public: true,
      name: 'List 2',
      title: 'List Title',
      updated_at: '',
    },
  ];

  const mockListQueryResponse: ListQueryResponse = {
    ...responseAttributes,
    result: {
      list: mockLists,
      total_results: 5,
    },
  };

  const mockListResponse: ListResponse = {
    ...responseAttributes,
    list: mockLists[0],
  };

  describe('query', () => {
    it('should make a get request to query campaigns', async () => {
      mockAxios.onGet().reply<ListQueryResponse>(200, mockListQueryResponse);

      const params = {
        id_less_than: 10,
        limit: 2,
      };

      const response = await lists.query(params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/list/version/4/do/query', {
        params,
      });

      expect(response).toEqual(mockListQueryResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a list', async () => {
      const id = 1;

      mockAxios.onGet().reply<ListResponse>(200, mockListResponse);

      const response = await lists.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/list/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockListResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a list', async () => {
      const id = 1;
      const params = {
        is_public: true,
        name: 'List 1 Updated',
      };

      mockAxios.onPost().reply<ListResponse>(200, mockListResponse);

      const response = await lists.update(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/list/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockListResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a list', async () => {
      const params = {
        description: null,
        is_crm_visible: false,
        is_dynamic: false,
        is_public: true,
        name: 'List 1',
        title: 'List Title',
      };

      mockAxios.onPost().reply<ListResponse>(200, mockListResponse);

      const response = await lists.create(params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/list/version/4/do/create`,
        params,
      );

      expect(response).toEqual(mockListResponse);
    });
  });

  describe('delete', () => {
    it('should make a post request to delete a list', async () => {
      const id = 1;

      mockAxios.onPost().reply(204);

      const response = await lists.delete(id);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/list/version/4/do/delete/id/${id}`,
      );

      expect(response).toBeUndefined();
    });
  });
});
