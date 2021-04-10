import {
  BaseResultParams,
  Create,
  CreatedSearchParams,
  DateString,
  IdSearchParams,
  OutputParams,
  OutputParamsFull,
  OutputParamsMobile,
  OutputParamsSimple,
  ResponseBase,
  Update,
  UpdatedSearchParams,
} from './types';
import ObjectsBase from './base';

export interface ProspectMobile {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  company: string | null;
}

interface ProspectBase extends ProspectMobile {
  campaign_id: number | null;
  salutation?: string | null;
  password?: string | null;
  prospect_account_id?: number;
  website?: string | null;
  job_title?: string | null;
  department?: string | null;
  country?: string | null;
  address_one?: string | null;
  address_two?: string | null;
  city?: string | null;
  state?: string | null;
  territory?: string | null;
  zip?: string | null;
  phone?: string | null;
  fax?: string | null;
  source?: string | null;
  annual_revenue?: string | null;
  employees?: string | null;
  industry?: string | null;
  years_in_business?: string | null;
  comments?: string | null;
  notes?: string | null;
  score?: number | null;
  is_do_not_email: boolean | null;
  is_do_not_call: boolean | null;
  is_reviewed: boolean | null;
  is_starred: boolean | null;
  is_archived: boolean | null;
}

export interface ProspectSimple extends ProspectBase {
  grade?: string | null;
  last_activity_at?: string | null;
  recent_interaction?: string | null;
  crm_lead_fid?: string | null;
  crm_contact_fid?: string | null;
  crm_owner_fid?: string | null;
  crm_account_fid?: string | null;
  crm_last_sync?: string | null;
  crm_url?: string | null;
  opted_out: boolean | null;
  created_at: string;
  updated_at: string;
  campaign?: {
    id: number;
    name: string;
  };
  // TODO - fill out these nested documents
  assigned_to?: unknown; // user
  last_activity?: {
    // TODO - fill out after implementing visitor activities
    visitor_activity: unknown;
  };
  // TODO - custom fields
}

interface ProfileCriteria {
  id: number;
  name: string;
  matches: string;
}

export interface ProspectFull extends ProspectSimple {
  profile?: {
    id: number;
    name: string;
    profile_criteria: ProfileCriteria | ProfileCriteria[];
  };
  visitors?: {
    // TODO - fill out after implementing visitors
    visitor: unknown | unknown[];
  } | null;
  visitor_activities?: {
    // TODO - fill out after implementing visitor activities
    visitor_activity: unknown | unknown[];
  } | null;
  lists?: {
    // TODO - fill out after implementing Lists
    list_subscription: unknown | unknown[];
  } | null;
}

export type LetterGrade =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F';

type ProspectSearchParams = {
  assigned?: boolean;
  assigned_to_user?: number | string; // user id or email
  deleted?: boolean;
  grade_equal_to?: LetterGrade;
  grade_greater_than?: LetterGrade;
  grade_less_than?: LetterGrade;
  is_starred?: boolean;
  last_activity_before?: DateString;
  last_activity_after?: DateString;
  last_activity_never?: boolean;
  list_id?: number;
  new?: boolean;
  score_equal_to?: number;
  score_greater_than?: number;
  score_less_than?: number;
} & IdSearchParams &
  CreatedSearchParams &
  UpdatedSearchParams;

interface ProspectResultParams extends BaseResultParams {
  fields?: string[];
  limit_related_records?: boolean;
  sort_by?: 'created_at' | 'id' | 'probability' | 'value';
}

export type ProspectQueryParams = ProspectSearchParams & ProspectResultParams & OutputParams;

// TODO - fix these types

export type UpdateProspect = Update<ProspectBase>;
export type UpdateProspects = Partial<ProspectBase>[]; // 'id' is allowed
export type UpdateProspectsV3 = {
  [idOrEmail: string]: UpdateProspect;
};

export type CreateProspect = Create<Omit<ProspectBase, 'email'>>;
export type CreateProspects = Create<ProspectBase, 'email'>[];
export type CreateProspectsV3 = {
  [email: string]: CreateProspect;
};

export type UpsertProspect = Partial<ProspectBase>;
export type UpsertProspects = UpsertProspect[];
export type UpsertProspectsV3 = {
  [idOrEmail: string]: UpdateProspect;
};

export interface BatchResponse extends ResponseBase {
  errors: {
    [identifier: string]: string;
  };
}

// assign must have exactly one of the following params
export type ProspectAssignParams = (
  | {
      user_email: string;
    }
  | {
      user_id: number;
    }
  | {
      group_id: number;
    }
) &
  OutputParams;

export interface ProspectQueryResponseMobile extends ResponseBase {
  result: {
    total_results: number;
    prospect?: ProspectMobile | ProspectMobile[];
  };
}

export interface ProspectQueryResponseSimple extends ResponseBase {
  result: {
    total_results: number;
    prospect?: ProspectSimple | ProspectSimple[];
  };
}

type ProspectQueryResponse = ProspectQueryResponseMobile | ProspectQueryResponseSimple;

export interface ProspectResponseMobile extends ResponseBase {
  prospect: ProspectMobile;
}

export interface ProspectResponseSimple extends ResponseBase {
  prospect: ProspectSimple;
}

export interface ProspectResponseFull extends ResponseBase {
  prospect: ProspectFull;
}

export type ProspectResponse =
  | ProspectResponseMobile
  | ProspectResponseSimple
  | ProspectResponseFull;

export default class Prospects extends ObjectsBase {
  objectName = 'prospect';

  query<T extends OutputParamsMobile & ProspectQueryParams>(
    params: T,
  ): Promise<ProspectQueryResponseMobile>;
  query<T extends OutputParamsSimple & ProspectQueryParams>(
    params: T,
  ): Promise<ProspectQueryResponseSimple>;
  // query only returns mobile or simple
  query<T extends OutputParamsFull & ProspectQueryParams>(
    params?: T,
  ): Promise<ProspectQueryResponseSimple>;

  public async query(params?: ProspectQueryParams): Promise<ProspectQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['query']);

    const response = await this.parent.axios.get<ProspectQueryResponse>(url, { params });

    return response.data;
  }

  create<T extends OutputParamsMobile>(
    email: string,
    data: CreateProspect,
    params: T,
  ): Promise<ProspectResponseMobile>;
  create<T extends OutputParamsSimple>(
    email: string,
    data: CreateProspect,
    params: T,
  ): Promise<ProspectResponseSimple>;
  create<T extends OutputParamsFull>(
    email: string,
    data: CreateProspect,
    params?: T,
  ): Promise<ProspectResponseFull>;

  public async create(
    email: string,
    data: CreateProspect,
    params?: OutputParams,
  ): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['create', 'email', email]);

    const response = await this.parent.axios.post<ProspectResponse>(url, { ...data, ...params });

    return response.data;
  }

  readByEmail<T extends OutputParamsMobile>(
    email: string,
    params: T,
  ): Promise<ProspectResponseMobile>;
  readByEmail<T extends OutputParamsSimple>(
    email: string,
    params: T,
  ): Promise<ProspectResponseSimple>;
  readByEmail<T extends OutputParamsFull>(email: string, params?: T): Promise<ProspectResponseFull>;

  public async readByEmail(email: string, params?: OutputParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'email', email]);

    const response = await this.parent.axios.get<ProspectResponse>(url, { params });

    return response.data;
  }

  readById<T extends OutputParamsMobile>(id: number, params: T): Promise<ProspectResponseMobile>;
  readById<T extends OutputParamsSimple>(id: number, params: T): Promise<ProspectResponseSimple>;
  readById<T extends OutputParamsFull>(id: number, params?: T): Promise<ProspectResponseFull>;

  public async readById(id: number, params?: OutputParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);

    const response = await this.parent.axios.get<ProspectResponse>(url, { params });

    return response.data;
  }

  readByFid<T extends OutputParamsMobile>(fid: number, params: T): Promise<ProspectResponseMobile>;
  readByFid<T extends OutputParamsSimple>(fid: number, params: T): Promise<ProspectResponseSimple>;
  readByFid<T extends OutputParamsFull>(fid: number, params?: T): Promise<ProspectResponseFull>;

  public async readByFid(fid: number, params?: OutputParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['read', 'fid', fid]);

    const response = await this.parent.axios.get<ProspectResponse>(url, { params });

    return response.data;
  }

  updateById<T extends OutputParamsMobile>(
    id: number,
    update: UpdateProspect,
    params: T,
  ): Promise<ProspectResponseMobile>;
  updateById<T extends OutputParamsSimple>(
    id: number,
    update: UpdateProspect,
    params: T,
  ): Promise<ProspectResponseSimple>;
  updateById<T extends OutputParamsFull>(
    id: number,
    update: UpdateProspect,
    params?: T,
  ): Promise<ProspectResponseFull>;

  public async updateById(
    id: number,
    update: UpdateProspect,
    params?: OutputParams,
  ): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['update', 'id', id]);

    const response = await this.parent.axios.post<ProspectResponse>(url, {
      ...update,
      ...params,
    });

    return response.data;
  }

  updateByFid<T extends OutputParamsMobile>(
    fid: number,
    update: UpdateProspect,
    params: T,
  ): Promise<ProspectResponseMobile>;
  updateByFid<T extends OutputParamsSimple>(
    fid: number,
    update: UpdateProspect,
    params: T,
  ): Promise<ProspectResponseSimple>;
  updateByFid<T extends OutputParamsFull>(
    fid: number,
    update: UpdateProspect,
    params?: T,
  ): Promise<ProspectResponseFull>;

  public async updateByFid(
    fid: number,
    update: UpdateProspect,
    params?: OutputParams,
  ): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['update', 'fid', fid]);

    const response = await this.parent.axios.post<ProspectResponse>(url, {
      ...update,
      ...params,
    });

    return response.data;
  }

  upsertByEmail<T extends OutputParamsMobile>(
    email: string,
    data: UpsertProspect,
    params: T,
  ): Promise<ProspectResponseMobile>;
  upsertByEmail<T extends OutputParamsSimple>(
    email: string,
    data: UpsertProspect,
    params: T,
  ): Promise<ProspectResponseSimple>;
  upsertByEmail<T extends OutputParamsFull>(
    email: string,
    data: UpsertProspect,
    params?: T,
  ): Promise<ProspectResponseFull>;

  public async upsertByEmail(
    email: string,
    data: UpsertProspect,
    params?: OutputParams,
  ): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['upsert', 'email', email]);

    const response = await this.parent.axios.post<ProspectResponse>(url, { ...data, ...params });

    return response.data;
  }

  upsertById<T extends OutputParamsMobile>(
    id: number,
    data: UpsertProspect,
    params: T,
  ): Promise<ProspectResponseMobile>;
  upsertById<T extends OutputParamsSimple>(
    id: number,
    data: UpsertProspect,
    params: T,
  ): Promise<ProspectResponseSimple>;
  upsertById<T extends OutputParamsFull>(
    id: number,
    data: UpsertProspect,
    params?: T,
  ): Promise<ProspectResponseFull>;

  public async upsertById(
    id: number,
    data: UpsertProspect,
    params?: OutputParams,
  ): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['upsert', 'id', id]);

    const response = await this.parent.axios.post<ProspectResponse>(url, { ...data, ...params });

    return response.data;
  }

  upsertByFid<T extends OutputParamsMobile>(
    fid: number,
    data: UpsertProspect,
    params: T,
  ): Promise<ProspectResponseMobile>;
  upsertByFid<T extends OutputParamsSimple>(
    fid: number,
    data: UpsertProspect,
    params: T,
  ): Promise<ProspectResponseSimple>;
  upsertByFid<T extends OutputParamsFull>(
    fid: number,
    data: UpsertProspect,
    params?: T,
  ): Promise<ProspectResponseFull>;

  public async upsertByFid(
    fid: number,
    data: UpsertProspect,
    params?: OutputParams,
  ): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['upsert', 'fid', fid]);

    const response = await this.parent.axios.post<ProspectResponse>(url, { ...data, ...params });

    return response.data;
  }

  assignById<T extends OutputParamsMobile & ProspectAssignParams>(
    id: number,
    params: T,
  ): Promise<ProspectResponseMobile>;
  assignById<T extends OutputParamsSimple & ProspectAssignParams>(
    id: number,
    params: T,
  ): Promise<ProspectResponseSimple>;
  assignById<T extends OutputParamsFull & ProspectAssignParams>(
    id: number,
    params: T,
  ): Promise<ProspectResponseFull>;

  public async assignById(id: number, params: ProspectAssignParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['assign', 'id', id]);

    const response = await this.parent.axios.post<ProspectResponse>(url, params);

    return response.data;
  }

  assignByFid<T extends OutputParamsMobile & ProspectAssignParams>(
    fid: number,
    params: T,
  ): Promise<ProspectResponseMobile>;
  assignByFid<T extends OutputParamsSimple & ProspectAssignParams>(
    fid: number,
    params: T,
  ): Promise<ProspectResponseSimple>;
  assignByFid<T extends OutputParamsFull & ProspectAssignParams>(
    fid: number,
    params: T,
  ): Promise<ProspectResponseFull>;

  public async assignByFid(fid: number, params: ProspectAssignParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['assign', 'fid', fid]);

    const response = await this.parent.axios.post<ProspectResponse>(url, params);

    return response.data;
  }

  unassignById<T extends OutputParamsMobile>(
    id: number,
    params: T,
  ): Promise<ProspectResponseMobile>;
  unassignById<T extends OutputParamsSimple>(
    id: number,
    params: T,
  ): Promise<ProspectResponseSimple>;
  unassignById<T extends OutputParamsFull>(id: number, params?: T): Promise<ProspectResponseFull>;

  public async unassignById(id: number, params?: OutputParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['unassign', 'id', id]);

    const response = await this.parent.axios.post<ProspectResponse>(url, params);

    return response.data;
  }

  unassignByFid<T extends OutputParamsMobile>(
    fid: number,
    params: T,
  ): Promise<ProspectResponseMobile>;
  unassignByFid<T extends OutputParamsSimple>(
    fid: number,
    params: T,
  ): Promise<ProspectResponseSimple>;
  unassignByFid<T extends OutputParamsFull>(fid: number, params?: T): Promise<ProspectResponseFull>;

  public async unassignByFid(fid: number, params?: OutputParams): Promise<ProspectResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['unassign', 'fid', fid]);

    const response = await this.parent.axios.post<ProspectResponse>(url, params);

    return response.data;
  }

  public async batchCreate(prospects: CreateProspects | CreateProspectsV3): Promise<BatchResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['batchCreate']);

    let prospectsStruct = prospects;

    if (this.parent.apiVersion === 3 && Array.isArray(prospects)) {
      prospectsStruct = prospects.reduce((struct: CreateProspectsV3, { email, ...rest }) => {
        if (!email) {
          throw 'Must specify email in each prospect for create';
        }
        return {
          ...struct,
          [email]: rest,
        };
      }, {});
    }

    const response = await this.parent.axios.post<BatchResponse>(url, {
      prospects: JSON.stringify({ prospects: prospectsStruct }),
    });

    return response.data;
  }

  public async batchUpdate(prospects: UpdateProspects | UpdateProspectsV3): Promise<BatchResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['batchUpdate']);

    let prospectsStruct = prospects;

    if (this.parent.apiVersion === 3 && Array.isArray(prospects)) {
      prospectsStruct = prospects.reduce((struct: UpdateProspectsV3, { id, email, ...rest }) => {
        let updateProspect: UpdateProspectsV3;
        if (id) {
          updateProspect = { [id]: { email, ...rest } };
        } else if (email) {
          updateProspect = { [email]: rest };
        } else {
          throw 'Must specify id or email in each prospect for update';
        }
        return {
          ...struct,
          ...updateProspect,
        };
      }, {});
    }

    const response = await this.parent.axios.post<BatchResponse>(url, {
      prospects: JSON.stringify({ prospects: prospectsStruct }),
    });

    return response.data;
  }

  public async batchUpsert(prospects: UpsertProspects | UpsertProspectsV3): Promise<BatchResponse> {
    const url = this.parent.getApiUrl(this.objectName, ['batchUpsert']);

    let prospectsStruct = prospects;

    if (this.parent.apiVersion === 3 && Array.isArray(prospects)) {
      prospectsStruct = prospects.reduce((struct: UpsertProspectsV3, { id, email, ...rest }) => {
        let upsertProspect: UpsertProspectsV3;
        if (id) {
          upsertProspect = { [id]: { email, ...rest } };
        } else if (email) {
          upsertProspect = { [email]: rest };
        } else {
          throw 'Must specify id or email in each prospect for upsert';
        }
        return {
          ...struct,
          ...upsertProspect,
        };
      }, {});
    }
    const response = await this.parent.axios.post<BatchResponse>(url, {
      prospects: JSON.stringify({ prospects: prospectsStruct }),
    });

    return response.data;
  }

  public async deleteById(id: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, ['delete', 'id', id]);

    await this.parent.axios.post(url);
  }

  public async deleteByFid(fid: number): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, ['delete', 'fid', fid]);

    await this.parent.axios.post(url);
  }

  public async deleteByEmail(email: string): Promise<void> {
    const url = this.parent.getApiUrl(this.objectName, ['delete', 'email', email]);

    await this.parent.axios.post(url);
  }
}
