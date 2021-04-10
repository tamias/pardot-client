import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import LifecycleHistories, {
  LifecycleHistory,
  LifecycleHistoryQueryResponse,
  LifecycleHistoryResponse,
} from '../lifecycle-histories';

describe('LifecycleHistories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const lifecycleHistories = new LifecycleHistories(pardot);

  const mockLifecycleHistories: LifecycleHistory[] = [
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
  ];

  const mockLifecycleHistoryQueryResponse: LifecycleHistoryQueryResponse = {
    ...responseAttributes,
    result: {
      lifecycleHistory: mockLifecycleHistories,
      total_results: 5,
    },
  };

  const mockLifecycleHistoryResponse: LifecycleHistoryResponse = {
    ...responseAttributes,
    lifecycleHistory: mockLifecycleHistories[0],
  };

  describe('query', () => {
    it('should make a get request to query lifecycle histories', async () => {
      mockAxios
        .onGet()
        .reply<LifecycleHistoryQueryResponse>(200, mockLifecycleHistoryQueryResponse);

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

      expect(response).toEqual(mockLifecycleHistoryQueryResponse);
    });
  });

  describe('read', () => {
    it('should make a get query to read a lifecycle history', async () => {
      const id = 1;

      mockAxios.onGet().reply<LifecycleHistoryResponse>(200, mockLifecycleHistoryResponse);

      const response = await lifecycleHistories.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/lifecycleHistory/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockLifecycleHistoryResponse);
    });
  });
});
