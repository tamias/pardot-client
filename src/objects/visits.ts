import { BaseResultParams, ResponseBase } from './types';
import ObjectsBase from './base';

interface VisitorPageView {
  id: number;
  url: string;
  title: string;
  created_at: string;
}

export interface Visit {
  id: number;
  visitor_id: number;
  prospect_id: number | null;
  visitor_page_view_count: number;
  first_visitor_page_view_at: string;
  last_visitor_page_view_at: string;
  duration_in_seconds: number;
  campaign_parameter: string | null;
  medium_parameter: string | null;
  source_parameter: string | null;
  content_parameter: string | null;
  term_parameter: string | null;
  created_at: string;
  updated_at: string;
  visitor_page_views: {
    visitor_page_view: VisitorPageView | VisitorPageView[];
  };
}

// Visits are always returned in order of ascending IDs
type VisitResultParams = Pick<BaseResultParams, 'limit' | 'offset'>;

export type VisitQueryParams = VisitResultParams;

export interface VisitQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    visit: Visit | Visit[];
  };
}

export interface VisitResponse extends ResponseBase {
  visit: Visit;
}

export default class Visits extends ObjectsBase {
  objectName = 'visit';

  public async queryByIds(ids: number[], params?: VisitQueryParams): Promise<VisitQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<VisitQueryResponse>(url, {
      params: { ...params, ids },
    });

    return response.data;
  }

  public async queryByVisitorIds(
    visitorIds: number[],
    params?: VisitQueryParams,
  ): Promise<VisitQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<VisitQueryResponse>(url, {
      params: { ...params, visitor_ids: visitorIds },
    });

    return response.data;
  }

  public async queryByProspectIds(
    prospectIds: number[],
    params?: VisitQueryParams,
  ): Promise<VisitQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<VisitQueryResponse>(url, {
      params: { ...params, prospect_ids: prospectIds },
    });

    return response.data;
  }

  public async read(id: number): Promise<VisitResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<VisitResponse>(url);

    return response.data;
  }
}
