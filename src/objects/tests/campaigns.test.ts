import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import Campaigns, { Campaign, CampaignQueryResponse, CampaignResponse } from '../campaigns';

describe('Campaigns', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const campaigns = new Campaigns(pardot);

  const mockCampaigns: Campaign[] = [
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
  ];

  const mockCampaignQueryResponse: CampaignQueryResponse = {
    ...responseAttributes,
    result: {
      campaign: mockCampaigns,
      total_results: 5,
    },
  };

  const mockCampaignResponse: CampaignResponse = {
    ...responseAttributes,
    campaign: mockCampaigns[0],
  };

  describe('query', () => {
    it('should make a get request to query campaigns', async () => {
      mockAxios.onGet().reply<CampaignQueryResponse>(200, mockCampaignQueryResponse);

      const params = {
        id_less_than: 10,
        limit: 2,
      };

      const response = await campaigns.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/campaign/version/4/do/query',
        { params },
      );

      expect(response).toEqual(mockCampaignQueryResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a campaign', async () => {
      const id = 1;

      mockAxios.onGet().reply<CampaignResponse>(200, mockCampaignResponse);

      const response = await campaigns.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/campaign/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockCampaignResponse);
    });
  });

  describe('update', () => {
    it('should make a post request to update a campaign', async () => {
      const id = 1;
      const params = {
        cost: 7,
        name: 'Campaign 1 Updated',
      };

      mockAxios.onPost().reply<CampaignResponse>(200, mockCampaignResponse);

      const response = await campaigns.update(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/campaign/version/4/do/update/id/${id}`,
        params,
      );

      expect(response).toEqual(mockCampaignResponse);
    });
  });

  describe('create', () => {
    it('should make a post request to create a campaign', async () => {
      const params = {
        cost: null,
        name: 'Campaign 1',
      };

      mockAxios.onPost().reply<CampaignResponse>(200, mockCampaignResponse);

      const response = await campaigns.create(params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/campaign/version/4/do/create`,
        params,
      );

      expect(response).toEqual(mockCampaignResponse);
    });
  });
});
