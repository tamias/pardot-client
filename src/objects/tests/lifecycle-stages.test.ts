import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import LifecycleStages, { LifecycleStageQueryResponse } from '../lifecycle-stages';

describe('LifecycleStages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const lifecycleStages = new LifecycleStages(pardot);

  describe('query', () => {
    it('should make a get request to query lifecycle stages', async () => {
      const mockResponse: LifecycleStageQueryResponse = {
        ...responseAttributes,
        result: {
          lifecycleStage: [
            {
              id: 1,
              is_locked: true,
              name: 'Lifecycle Stage 1',
              position: 0,
            },
            {
              id: 2,
              is_locked: false,
              name: 'Lifecycle Stage 2',
              position: 1,
            },
          ],
          total_results: 5,
        },
      };

      mockAxios.onGet().reply<LifecycleStageQueryResponse>(200, mockResponse);

      const params = {
        id_greater_than: 40,
        limit: 2,
      };

      const response = await lifecycleStages.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/lifecycleStage/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockResponse);
    });
  });
});
