import {
  BaseResultParams,
  Create,
  CreatedSearchParams,
  IdSearchParams,
  OutputParams,
  OutputParamsFull,
  OutputParamsMobile,
  OutputParamsSimple,
  ResponseBase,
  Update,
} from './types';
import ObjectsBase from './base';

export interface OpportunityMobile {
  id: number;
  campaign_id: number;
  name: string;
  value: number;
  probability: number;
  type: string;
  stage: string;
  status: 'won' | 'lost' | 'open';
  closed_at: string;
  created_at: string;
  updated_at: string;
}

export interface OpportunitySimple extends OpportunityMobile {
  campaign: {
    id: number;
    name: string;
  };
  prospects: {
    // TODO - fill out after implementing prospects
    prospect: unknown | unknown[];
  };
}

export interface OpportunityFull extends OpportunitySimple {
  opportunity_activities: {
    // TODO - fill out after implementing visitor activities
    visitor_activity: unknown;
  };
}

type OpportunitySearchParams = {
  probability_greater_than?: number;
  probability_less_than?: number;
  prospect_email?: string;
  prospect_id?: number;
  value_greater_than?: number;
  value_less_than?: number;
} & IdSearchParams &
  CreatedSearchParams;

interface OpportunityResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id' | 'probability' | 'value';
}

export type OpportunityQueryParams = OpportunitySearchParams &
  OpportunityResultParams &
  OutputParams;

export type UpdateOpportunity = Update<OpportunityMobile>;
export type CreateOpportunity = Create<
  OpportunityMobile,
  'campaign_id' | 'name' | 'value' | 'probability'
>;

export interface OpportunityQueryResponseMobile extends ResponseBase {
  result: {
    total_results: number;
    opportunity: OpportunityMobile | OpportunityMobile[];
  };
}

export interface OpportunityQueryResponseSimple extends ResponseBase {
  result: {
    total_results: number;
    opportunity: OpportunitySimple | OpportunitySimple[];
  };
}

export interface OpportunityQueryResponseFull extends ResponseBase {
  result: {
    total_results: number;
    opportunity: OpportunityFull | OpportunityFull[];
  };
}

export type OpportunityQueryResponse =
  | OpportunityQueryResponseMobile
  | OpportunityQueryResponseSimple
  | OpportunityQueryResponseFull;

export interface OpportunityResponseMobile extends ResponseBase {
  opportunity: OpportunityMobile;
}

export interface OpportunityResponseSimple extends ResponseBase {
  opportunity: OpportunitySimple;
}

export interface OpportunityResponseFull extends ResponseBase {
  opportunity: OpportunityFull;
}

export type OpportunityResponse =
  | OpportunityResponseMobile
  | OpportunityResponseSimple
  | OpportunityResponseFull;

export default class Opportunities extends ObjectsBase {
  objectName = 'opportunity';

  query<T extends OutputParamsMobile & OpportunityQueryParams>(
    params: T,
  ): Promise<OpportunityQueryResponseMobile>;
  query<T extends OutputParamsSimple & OpportunityQueryParams>(
    params: T,
  ): Promise<OpportunityQueryResponseSimple>;
  query<T extends OutputParamsFull & OpportunityQueryParams>(
    params?: T,
  ): Promise<OpportunityQueryResponseFull>;

  public async query(params?: OpportunityQueryParams): Promise<OpportunityQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<OpportunityQueryResponse>(url, { params });

    return response.data;
  }

  read<T extends OutputParamsMobile & OpportunityQueryParams>(
    id: number,
    params: T,
  ): Promise<OpportunityResponseMobile>;
  read<T extends OutputParamsSimple & OpportunityQueryParams>(
    id: number,
    params: T,
  ): Promise<OpportunityResponseSimple>;
  read<T extends OutputParamsFull & OpportunityQueryParams>(
    id: number,
    params?: T,
  ): Promise<OpportunityResponseFull>;

  public async read(id: number, params?: OutputParams): Promise<OpportunityResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<OpportunityResponse>(url, { params });

    return response.data;
  }

  createByEmail<T extends OutputParamsMobile & OpportunityQueryParams>(
    prospectEmail: string,
    create: CreateOpportunity,
    params: T,
  ): Promise<OpportunityResponseMobile>;
  createByEmail<T extends OutputParamsSimple & OpportunityQueryParams>(
    prospectEmail: string,
    create: CreateOpportunity,
    params: T,
  ): Promise<OpportunityResponseSimple>;
  createByEmail<T extends OutputParamsFull & OpportunityQueryParams>(
    prospectEmail: string,
    create: CreateOpportunity,
    params?: T,
  ): Promise<OpportunityResponseFull>;

  public async createByEmail(
    prospectEmail: string,
    create: CreateOpportunity,
    params?: OutputParams,
  ): Promise<OpportunityResponse> {
    const url = this.parent.getApiUrl(this.objectName, `create/prospect_email/${prospectEmail}`);

    const response = await this.parent.axios.post<OpportunityResponse>(url, {
      ...create,
      ...params,
    });

    return response.data;
  }

  createById<T extends OutputParamsMobile & OpportunityQueryParams>(
    prospectId: number,
    create: CreateOpportunity,
    params: T,
  ): Promise<OpportunityResponseMobile>;
  createById<T extends OutputParamsSimple & OpportunityQueryParams>(
    prospectId: number,
    create: CreateOpportunity,
    params: T,
  ): Promise<OpportunityResponseSimple>;
  createById<T extends OutputParamsFull & OpportunityQueryParams>(
    prospectId: number,
    create: CreateOpportunity,
    params?: T,
  ): Promise<OpportunityResponseFull>;

  public async createById(
    prospectId: number,
    create: CreateOpportunity,
    params?: OutputParams,
  ): Promise<OpportunityResponse> {
    const url = this.parent.getApiUrl(this.objectName, `create/prospect_id/${prospectId}`);

    const response = await this.parent.axios.post<OpportunityResponse>(url, {
      ...create,
      ...params,
    });

    return response.data;
  }

  update<T extends OutputParamsMobile & OpportunityQueryParams>(
    id: number,
    update: UpdateOpportunity,
    params: T,
  ): Promise<OpportunityResponseMobile>;
  update<T extends OutputParamsSimple & OpportunityQueryParams>(
    id: number,
    update: UpdateOpportunity,
    params: T,
  ): Promise<OpportunityResponseSimple>;
  update<T extends OutputParamsFull & OpportunityQueryParams>(
    id: number,
    update: UpdateOpportunity,
    params?: T,
  ): Promise<OpportunityResponseFull>;

  public async update(
    id: number,
    update: UpdateOpportunity,
    params?: OutputParams,
  ): Promise<OpportunityResponse> {
    const url = this.parent.getApiUrl(this.objectName, `update/id/${id}`);

    const response = await this.parent.axios.post<OpportunityResponse>(url, {
      ...update,
      ...params,
    });

    return response.data;
  }

  public async delete(id: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, `delete/id/${id}`);

    await this.parent.axios.post(url);
  }

  public async undelete(id: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, `undelete/id/${id}`);

    await this.parent.axios.post(url);
  }
}
