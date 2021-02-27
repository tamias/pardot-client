import { CampaignQueryResponse, CampaignResponse } from '../../types';
import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import Campaigns from '../campaigns';
import PardotClient from '../../index';

class CampaignsWrapper extends Campaigns {
  public get parentWrapper(): PardotClient {
    return this.parent;
  }
}

describe('Campaigns', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  describe('constructor', () => {
    it('should set parent', () => {
      const campaigns = new CampaignsWrapper(pardot);

      expect(campaigns.parentWrapper).toBe(pardot);
    });
  });

  describe('query', () => {
    const campaigns = new Campaigns(pardot);

    it('should make a get request to query campaigns', async () => {
      const mockResponse: CampaignQueryResponse = {
        ...responseAttributes,
        result: {
          campaign: [
            {
              cost: null,
              id: 1,
              name: 'Campaign 1',
            },
            {
              cost: 5,
              id: 2,
              name: 'Campaign 2',
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<CampaignQueryResponse>(200, mockResponse);

      const params = {
        id_less_than: 10,
        limit: 2,
      };

      const response = await campaigns.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/campaign/version/4/do/query',
        { params },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    const campaigns = new Campaigns(pardot);

    it('should make a get request to read a campaign', async () => {
      const id = 1;

      const mockResponse: CampaignResponse = {
        ...responseAttributes,
        campaign: {
          cost: null,
          id,
          name: 'Campaign 1',
        },
      };

      mockAxios.onGet().reply<CampaignResponse>(200, mockResponse);

      const response = await campaigns.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/campaign/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    const campaigns = new Campaigns(pardot);

    it('should make a post request to update a campaign', async () => {
      const id = 1;
      const params = {
        cost: 7,
        name: 'Campaign 1 Updated',
      };

      const mockResponse: CampaignResponse = {
        ...responseAttributes,
        campaign: {
          id,
          ...params,
        },
      };

      mockAxios.onPost().reply<CampaignResponse>(200, mockResponse);

      const response = await campaigns.update(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/campaign/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    const campaigns = new Campaigns(pardot);

    it('should make a post request to create a campaign', async () => {
      const params = {
        cost: null,
        name: 'Campaign 1',
      };

      const mockResponse: CampaignResponse = {
        ...responseAttributes,
        campaign: {
          id: 1,
          ...params,
        },
      };

      mockAxios.onPost().reply<CampaignResponse>(200, mockResponse);

      const response = await campaigns.create(params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/campaign/version/4/do/create`,
        params,
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
