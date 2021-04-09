import { mockAxios, onGetSpy, pardot, responseAttributes } from './lib/setup';
import Visits, { VisitQueryParams, VisitQueryResponse, VisitResponse } from '../visits';

describe('Visits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  const visits = new Visits(pardot);

  const mockVisits = [
    {
      campaign_parameter: null,
      content_parameter: null,
      created_at: '',
      duration_in_seconds: 0,
      first_visitor_page_view_at: '',
      id: 1,
      last_visitor_page_view_at: '',
      medium_parameter: null,
      prospect_id: 11,
      source_parameter: null,
      term_parameter: null,
      updated_at: '',
      visitor_id: 101,
      visitor_page_view_count: 1,
      visitor_page_views: {
        visitor_page_view: {
          created_at: '',
          id: 1001,
          title: 'Landing Page',
          url: 'http://example.com/landing-page',
        },
      },
    },
    {
      campaign_parameter: null,
      content_parameter: null,
      created_at: '',
      duration_in_seconds: 0,
      first_visitor_page_view_at: '',
      id: 2,
      last_visitor_page_view_at: '',
      medium_parameter: null,
      prospect_id: 12,
      source_parameter: null,
      term_parameter: null,
      updated_at: '',
      visitor_id: 102,
      visitor_page_view_count: 1,
      visitor_page_views: {
        visitor_page_view: {
          created_at: '',
          id: 1002,
          title: 'Landing Page',
          url: 'http://example.com/landing-page',
        },
      },
    },
  ];

  const mockVisitsResponse: VisitQueryResponse = {
    ...responseAttributes,
    result: {
      total_results: 5,
      visit: mockVisits,
    },
  };

  const mockVisitResponse: VisitResponse = {
    ...responseAttributes,
    visit: mockVisits[0],
  };

  describe('queryByIds', () => {
    it('should make a get request to query visits by ids', async () => {
      mockAxios.onGet().reply<VisitQueryResponse>(200, mockVisitsResponse);

      const ids = [1, 2];

      const params: VisitQueryParams = {
        limit: 2,
      };

      const response = await visits.queryByIds(ids, params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/visit/version/4/do/query', {
        params: { ...params, ids },
      });

      expect(response).toEqual(mockVisitsResponse);
    });
  });

  describe('queryByVisitorIds', () => {
    it('should make a get request to query visits by visitor ids', async () => {
      mockAxios.onGet().reply<VisitQueryResponse>(200, mockVisitsResponse);

      const visitorIds = [101, 102];

      const params: VisitQueryParams = {
        limit: 2,
      };

      const response = await visits.queryByVisitorIds(visitorIds, params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/visit/version/4/do/query', {
        params: { ...params, visitor_ids: visitorIds },
      });

      expect(response).toEqual(mockVisitsResponse);
    });
  });

  describe('queryByProspectIds', () => {
    it('should make a get request to query visits by prospect ids', async () => {
      mockAxios.onGet().reply<VisitQueryResponse>(200, mockVisitsResponse);

      const prospectIds = [11, 12];

      const params: VisitQueryParams = {
        limit: 2,
      };

      const response = await visits.queryByProspectIds(prospectIds, params);

      expect(onGetSpy).toHaveBeenCalledWith('https://pi.pardot.com/api/visit/version/4/do/query', {
        params: { ...params, prospect_ids: prospectIds },
      });

      expect(response).toEqual(mockVisitsResponse);
    });
  });

  describe('read', () => {
    it('should make a get request to read a visit', async () => {
      const id = 1;

      mockAxios.onGet().reply<VisitResponse>(200, mockVisitResponse);

      const response = await visits.read(id);

      expect(onGetSpy).toHaveBeenCalledWith(
        `https://pi.pardot.com/api/visit/version/4/do/read/id/${id}`,
      );

      expect(response).toEqual(mockVisitResponse);
    });
  });
});
