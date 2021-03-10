import { BaseResultParams, CreatedSearchParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';

export interface LifecycleHistory {
  id: number;
  prospect_id: number;
  previous_stage_id: number | null;
  next_stage_id: number | null;
  seconds_elapsed: number | null;
  created_at: string;
}

type LifecycleHistorySearchParams = IdSearchParams & CreatedSearchParams;

interface LifecycleHistoryResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

export interface LifecycleHistoryQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    lifecycleHistory: LifecycleHistory | LifecycleHistory[];
  };
}

export interface LifecycleHistoryResponse extends ResponseBase {
  lifecycleHistory: LifecycleHistory;
}

export default class LifecycleHistories extends ObjectsBase {
  objectName = 'lifecycleHistory';

  public async query(
    params?: LifecycleHistorySearchParams & LifecycleHistoryResultParams,
  ): Promise<LifecycleHistoryQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<LifecycleHistoryQueryResponse>(url, { params });

    return response.data;
  }

  public async read(id: number): Promise<LifecycleHistoryResponse> {
    const url = this.parent.getApiUrl(this.objectName, `read/id/${id}`);

    const response = await this.parent.axios.get<LifecycleHistoryResponse>(url);

    return response.data;
  }
}
