import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import { OutputParams } from '../types';
import VisitorActivities, {
  VISITOR_ACTIVITY_TYPE_NAMES,
  VisitorActivityQueryParams,
  VisitorActivityQueryResponseMobile,
  VisitorActivityResponseMobile,
} from '../visitor-activities';

describe('VisitorActivities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const visitorActivities = new VisitorActivities(pardot);

  const mockVisitorActivities = [
    {
      campaign: { id: 1001, name: 'Campaign 1' },
      created_at: '',
      details: 'Pardot Form Handler',
      form_handler_id: 101,
      id: 1,
      prospect_id: 11,
      type: 4,
      type_name: VISITOR_ACTIVITY_TYPE_NAMES.FormHandler,
      updated_at: '',
    },
    {
      campaign: { id: 1002, name: 'Campaign 2' },
      created_at: '',
      details: 'Pardot Form Handler',
      form_handler_id: 102,
      id: 2,
      prospect_id: 12,
      type: 4,
      type_name: VISITOR_ACTIVITY_TYPE_NAMES.FormHandler,
      updated_at: '',
    },
  ];

  const mockVisitorActivitiesResponse: VisitorActivityQueryResponseMobile = {
    ...responseAttributes,
    result: {
      total_results: 5,
      visitor_activity: mockVisitorActivities,
    },
  };

  const mockVisitorActivityResponse: VisitorActivityResponseMobile = {
    ...responseAttributes,
    visitor_activity: mockVisitorActivities[0],
  };

  describe('query', () => {
    it('should make a get request to query visitor activities', async () => {
      mockAxios
        .onGet()
        .reply<VisitorActivityQueryResponseMobile>(200, mockVisitorActivitiesResponse);

      const params: VisitorActivityQueryParams = {
        form_handler_only: true,
        limit: 2,
        output: 'mobile',
      };

      const response = await visitorActivities.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/visitorActivity/version/4/do/query',
        {
          params,
        },
      );

      expect(response).toEqual(mockVisitorActivitiesResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a visitor activity', async () => {
      const id = 1;

      mockAxios.onGet().reply<VisitorActivityResponseMobile>(200, mockVisitorActivityResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await visitorActivities.read(id, params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/visitorActivity/version/4/do/read/id/${id}`,
        {
          params,
        },
      );

      expect(response).toEqual(mockVisitorActivityResponse);
    });
  });
});
