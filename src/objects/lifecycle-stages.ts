import { BaseResultParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';

export interface LifecycleStage {
  id: number;
  name: string;
  position: number;
  is_locked: boolean;
}

type LifecycleStageSearchParams = IdSearchParams;

interface LifecycleStageResultParams extends BaseResultParams {
  sort_by?: 'created_at' | 'id';
}

type LifecycleStageQueryParams = LifecycleStageSearchParams & LifecycleStageResultParams;

export interface LifecycleStageQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    lifecycleStage: LifecycleStage | LifecycleStage[];
  };
}

export default class LifecycleStages extends ObjectsBase {
  objectName = 'lifecycleStage';

  public async query(params?: LifecycleStageQueryParams): Promise<LifecycleStageQueryResponse> {
    const url = this.parent.getApiUrl(this.objectName, 'query');

    const response = await this.parent.axios.get<LifecycleStageQueryResponse>(url, { params });

    return response.data;
  }
}
