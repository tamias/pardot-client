import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import ListMemberships, {
  ListMembership,
  ListMembershipQueryResponse,
  ListMembershipResponse,
} from '../list-memberships';

describe('ListMemberships', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const listMemberships = new ListMemberships(pardot);

  const mockListMemberships: ListMembership[] = [
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
  ];

  const mockListMembershipQueryResponse: ListMembershipQueryResponse = {
    ...responseAttributes,
    result: {
      list_membership: mockListMemberships,
      total_results: 5,
    },
  };

  const mockListMembershipResponse: ListMembershipResponse = {
    ...responseAttributes,
    list_membership: mockListMemberships[0],
  };

  describe('query', () => {
    it('should make a get request to query list memberships', async () => {
      mockAxios.onGet().reply<ListMembershipQueryResponse>(200, mockListMembershipQueryResponse);

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

      expect(response).toEqual(mockListMembershipQueryResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      mockAxios.onGet().reply<ListMembershipResponse>(200, mockListMembershipResponse);

      const response = await listMemberships.read(listId, prospectId);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/read/list_id/${listId}/prospect_id/${prospectId}`,
      );

      expect(response).toEqual(mockListMembershipResponse);
    });
  });

  describe('readById', () => {
    it('should make a get request to read a list membership by id', async () => {
      const id = 1;

      mockAxios.onGet().reply<ListMembershipResponse>(200, mockListMembershipResponse);

      const response = await listMemberships.readById(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockListMembershipResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      const params = {
        opted_out: false,
      };

      mockAxios.onPost().reply<ListMembershipResponse>(200, mockListMembershipResponse);

      const response = await listMemberships.create(listId, prospectId, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/create/list_id/${listId}/prospect_id/${prospectId}`,
        params,
      );

      expect(response).toEqual(mockListMembershipResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a list membership', async () => {
      const listId = 11;
      const prospectId = 101;

      const params = {
        opted_out: true,
      };

      mockAxios.onPost().reply<ListMembershipResponse>(200, mockListMembershipResponse);

      const response = await listMemberships.update(listId, prospectId, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/update/list_id/${listId}/prospect_id/${prospectId}`,
        params,
      );

      expect(response).toEqual(mockListMembershipResponse);
    });
  });

  describe('updateById', () => {
    it('should make a post request to update a list membership by id', async () => {
      const id = 1;

      const params = {
        opted_out: true,
      };

      mockAxios.onPost().reply<ListMembershipResponse>(200, mockListMembershipResponse);

      const response = await listMemberships.updateById(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/listMembership/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockListMembershipResponse);
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
