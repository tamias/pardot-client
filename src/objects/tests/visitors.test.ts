import { mockAxios, onGetSpy, onPostSpy, pardot, responseAttributes } from './lib/setup';
import { OutputParams } from '../types';
import Visitors, {
  VisitorAssignParams,
  VisitorQueryParams,
  VisitorQueryResponseMobile,
  VisitorResponseMobile,
} from '../visitors';

describe('Visitors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const visitors = new Visitors(pardot);

  const mockVisitors = [
    {
      created_at: '',
      hostname: 'localhost',
      id: 1,
      ip_address: '127.0.0.1',
      page_view_count: 5,
      prospect_id: 11,
      updated_at: '',
    },
    {
      created_at: '',
      hostname: 'localhost',
      id: 2,
      ip_address: '127.0.0.1',
      page_view_count: 20,
      prospect_id: 12,
      updated_at: '',
    },
  ];

  const mockVisitorsResponse: VisitorQueryResponseMobile = {
    ...responseAttributes,
    result: {
      total_results: 5,
      visitor: mockVisitors,
    },
  };

  const mockVisitorResponse: VisitorResponseMobile = {
    ...responseAttributes,
    visitor: mockVisitors[0],
  };

  describe('query', () => {
    it('should make a get request to query visitors', async () => {
      mockAxios.onGet().reply<VisitorQueryResponseMobile>(200, mockVisitorsResponse);

      const params: VisitorQueryParams = {
        limit: 2,
        output: 'mobile',
      };

      const response = await visitors.query(params);

      expect(onGetSpy).toHaveBeenCalledWith(
        'https://pi.pardot.com/api/visitor/version/4/do/query',
        { params },
      );

      expect(response).toEqual(mockVisitorsResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a visitor', async () => {
      const id = 1;

      mockAxios.onGet().reply<VisitorResponseMobile>(200, mockVisitorResponse);

      const params: OutputParams = {
        output: 'mobile',
      };

      const response = await visitors.read(id, params);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/visitor/version/4/do/read/id/${id}`,
        {
          params,
        },
      );

      expect(response).toEqual(mockVisitorResponse);
    });
  });

  describe('assign', () => {
    it('should make a post request to assign a visitor', async () => {
      const id = 1;

      mockAxios.onPost().reply<VisitorResponseMobile>(200, mockVisitorResponse);

      const params: VisitorAssignParams = {
        output: 'mobile',
        prospect_id: 11,
      };

      const response = await visitors.assign(id, params);

      expect(onPostSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/visitor/version/4/do/assign/id/${id}`,
        params,
      );

      expect(response).toEqual(mockVisitorResponse);
    });
  });
});
