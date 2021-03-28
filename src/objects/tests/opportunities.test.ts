import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import { OutputParams } from '../types';
import Opportunities, {
  OpportunityQueryParams,
  OpportunityQueryResponseMobile,
  OpportunityResponseMobile,
} from '../opportunities';

describe('Opportunities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const opportunities = new Opportunities(pardot);

  describe('query', () => {
    it('should make a get request to query opportunities', async () => {
      const mockResponse: OpportunityQueryResponseMobile = {
        ...responseAttributes,
        result: {
          opportunity: [
            {
              campaign_id: 11,
              closed_at: '',
              created_at: '',
              id: 1,
              name: 'Opportunity 1',
              probability: 0.5,
              stage: '',
              status: 'open',
              type: '',
              updated_at: '',
              value: 7,
            },
            {
              campaign_id: 11,
              closed_at: '',
              created_at: '',
              id: 2,
              name: 'Opportunity 2',
              probability: 0.25,
              stage: '',
              status: 'won',
              type: '',
              updated_at: '',
              value: 14,
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<OpportunityQueryResponseMobile>(200, mockResponse);

      const params: OpportunityQueryParams = {
        limit: 2,
        output: 'mobile',
      };

      const response = await opportunities.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/opportunity/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read an opportunity', async () => {
      const id = 1;

      const mockResponse: OpportunityResponseMobile = {
        ...responseAttributes,
        opportunity: {
          campaign_id: 11,
          closed_at: '',
          created_at: '',
          id,
          name: 'Opportunity 1',
          probability: 0.5,
          stage: '',
          status: 'open',
          type: '',
          updated_at: '',
          value: 7,
        },
      };

      mockAxios.onGet().reply<OpportunityResponseMobile>(200, mockResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await opportunities.read(id, params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/opportunity/version/4/do/read/id/${id}`,
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('createByEmail', () => {
    it('should make a post request to create an opportunity by prospect email', async () => {
      const prospectEmail = 'prospect@example.com';

      const mockResponse: OpportunityResponseMobile = {
        ...responseAttributes,
        opportunity: {
          campaign_id: 11,
          closed_at: '',
          created_at: '',
          id: 1,
          name: 'Opportunity 1',
          probability: 0.5,
          stage: '',
          status: 'open',
          type: '',
          updated_at: '',
          value: 7,
        },
      };

      mockAxios.onPost().reply<OpportunityResponseMobile>(200, mockResponse);

      const create = {
        campaign_id: 1,
        name: 'Opportunity',
        probability: 1,
        value: 1,
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await opportunities.createByEmail(prospectEmail, create, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/opportunity/version/4/do/create/prospect_email/${encodeURIComponent(
          prospectEmail,
        )}`,
        {
          ...create,
          ...params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('createById', () => {
    it('should make a post request to create an opportunity by prospect id', async () => {
      const prospectId = 101;

      const mockResponse: OpportunityResponseMobile = {
        ...responseAttributes,
        opportunity: {
          campaign_id: 11,
          closed_at: '',
          created_at: '',
          id: 1,
          name: 'Opportunity 1',
          probability: 0.5,
          stage: '',
          status: 'open',
          type: '',
          updated_at: '',
          value: 7,
        },
      };

      mockAxios.onPost().reply<OpportunityResponseMobile>(200, mockResponse);

      const create = {
        campaign_id: 1,
        name: 'Opportunity',
        probability: 1,
        value: 1,
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await opportunities.createById(prospectId, create, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/opportunity/version/4/do/create/prospect_id/${prospectId}`,
        {
          ...create,
          ...params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update an opportunity', async () => {
      const id = 1;

      const mockResponse: OpportunityResponseMobile = {
        ...responseAttributes,
        opportunity: {
          campaign_id: 11,
          closed_at: '',
          created_at: '',
          id: 1,
          name: 'Opportunity 1',
          probability: 0.5,
          stage: '',
          status: 'open',
          type: '',
          updated_at: '',
          value: 7,
        },
      };

      mockAxios.onPost().reply<OpportunityResponseMobile>(200, mockResponse);

      const update = {
        probability: 1,
        value: 1,
      };

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await opportunities.update(id, update, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/opportunity/version/4/do/update/id/${id}`,
        {
          ...update,
          ...params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make a post request to delete an opportunity', async () => {
      const id = 1;

      mockAxios.onPost().reply<OpportunityResponseMobile>(204);

      const response = await opportunities.delete(id);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/opportunity/version/4/do/delete/id/${id}`,
      );

      expect(response).toBeUndefined();
    });
  });

  describe('undelete', () => {
    it('should make a post request to undelete an opportunity', async () => {
      const id = 1;

      mockAxios.onPost().reply<OpportunityResponseMobile>(204);

      const response = await opportunities.undelete(id);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/opportunity/version/4/do/undelete/id/${id}`,
      );

      expect(response).toBeUndefined();
    });
  });
});
