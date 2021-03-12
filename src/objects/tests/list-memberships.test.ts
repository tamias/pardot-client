import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import ListMemberships, {
  ListMembershipQueryResponse,
  ListMembershipResponse,
} from '../list-memberships';

describe('ListMemberships', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const listMemberships = new ListMemberships(pardot);

  describe('query', () => {
    it('should make a get request to query list memberships', async () => {
      const mockResponse: ListMembershipQueryResponse = {
        ...responseAttributes,
        result: {
          list_membership: [
            {
              created_at: '',
              id: 1,
              list_id: 11,
              opted_out: false,
              prospect_id: 101,
              updated_at: '',
            },
            {
              created_at: '',
              id: 2,
              list_id: 11,
              opted_out: true,
              prospect_id: 102,
              updated_at: '',
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<ListMembershipQueryResponse>(200, mockResponse);

      const params = {
        limit: 2,
        list_id: 11,
      };

      const response = await listMemberships.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/listMembership/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      const mockResponse: ListMembershipResponse = {
        ...responseAttributes,
        list_membership: {
          created_at: '',
          id: 1,
          list_id: 11,
          opted_out: false,
          prospect_id: 101,
          updated_at: '',
        },
      };

      mockAxios.onGet().reply<ListMembershipResponse>(200, mockResponse);

      const response = await listMemberships.read(listId, prospectId);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/read/list_id/${listId}/prospect_id/${prospectId}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('readById', () => {
    it('should make a get request to read a list membership by id', async () => {
      const id = 1;

      const mockResponse: ListMembershipResponse = {
        ...responseAttributes,
        list_membership: {
          created_at: '',
          id: 1,
          list_id: 11,
          opted_out: false,
          prospect_id: 101,
          updated_at: '',
        },
      };

      mockAxios.onGet().reply<ListMembershipResponse>(200, mockResponse);

      const response = await listMemberships.readById(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      const params = {
        opted_out: false,
      };

      const mockResponse: ListMembershipResponse = {
        ...responseAttributes,
        list_membership: {
          created_at: '',
          id: 1,
          list_id: listId,
          prospect_id: prospectId,
          updated_at: '',
          ...params,
        },
      };

      mockAxios.onPost().reply<ListMembershipResponse>(200, mockResponse);

      const response = await listMemberships.create(listId, prospectId, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/create/list_id/${listId}/prospect_id/${prospectId}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      const params = {
        opted_out: true,
      };

      const mockResponse: ListMembershipResponse = {
        ...responseAttributes,
        list_membership: {
          created_at: '',
          id: 1,
          list_id: listId,
          prospect_id: prospectId,
          updated_at: '',
          ...params,
        },
      };

      mockAxios.onPost().reply<ListMembershipResponse>(200, mockResponse);

      const response = await listMemberships.update(listId, prospectId, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/update/list_id/${listId}/prospect_id/${prospectId}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('updateById', () => {
    it('should make a post request to update a list membership by id', async () => {
      const id = 1;

      const params = {
        opted_out: true,
      };

      const mockResponse: ListMembershipResponse = {
        ...responseAttributes,
        list_membership: {
          created_at: '',
          id: 1,
          list_id: 11,
          prospect_id: 101,
          updated_at: '',
          ...params,
        },
      };

      mockAxios.onPost().reply<ListMembershipResponse>(200, mockResponse);

      const response = await listMemberships.updateById(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make a post request to delete a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      mockAxios.onPost().reply<ListMembershipResponse>(204);

      const response = await listMemberships.delete(listId, prospectId);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/delete/list_id/${listId}/prospect_id/${prospectId}`,
      );

      expect(response).toBeUndefined();
    });
  });

  describe('deleteById', () => {
    it('should make a post request to delete a list membership by id', async () => {
      const id = 1;

      mockAxios.onPost().reply<ListMembershipResponse>(204);

      const response = await listMemberships.deleteById(id);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/delete/id/${id}`,
      );

      expect(response).toBeUndefined();
    });
  });
});
