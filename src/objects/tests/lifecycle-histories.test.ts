import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import LifecycleHistories, {
  LifecycleHistoryQueryResponse,
  LifecycleHistoryResponse,
} from '../lifecycle-histories';

describe('LifecycleHistories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const lifecycleHistories = new LifecycleHistories(pardot);

  describe('query', () => {
    it('should make a get request to query lifecycle histories', async () => {
      const mockResponse: LifecycleHistoryQueryResponse = {
        ...responseAttributes,
        result: {
          lifecycleHistory: [
            {
              created_at: '',
              id: 1,
              next_stage_id: 101,
              previous_stage_id: null,
              prospect_id: 11,
              seconds_elapsed: null,
            },
            {
              created_at: '',
              id: 2,
              next_stage_id: 102,
              previous_stage_id: 101,
              prospect_id: 12,
              seconds_elapsed: null,
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<LifecycleHistoryQueryResponse>(200, mockResponse);

      const params = {
        id_greater_than: 40,
        limit: 2,
      };

      const response = await lifecycleHistories.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/lifecycleHistory/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });

  describe('read', () => {
    it('should make a get query to read a lifecycle history', async () => {
      const id = 1;

      const mockResponse: LifecycleHistoryResponse = {
        ...responseAttributes,
        lifecycleHistory: {
          created_at: '',
          id: 1,
          next_stage_id: 101,
          previous_stage_id: null,
          prospect_id: 11,
          seconds_elapsed: null,
        },
      };

      mockAxios.onGet().reply<LifecycleHistoryResponse>(200, mockResponse);

      const response = await lifecycleHistories.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/lifecycleHistory/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
