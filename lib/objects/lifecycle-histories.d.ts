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
declare type LifecycleHistorySearchParams = IdSearchParams & CreatedSearchParams;
interface LifecycleHistoryResultParams extends BaseResultParams {
    sort_by?: 'created_at' | 'id';
}
declare type LifecycleHistoryQueryParams = LifecycleHistorySearchParams & LifecycleHistoryResultParams;
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
    objectName: string;
    query(params?: LifecycleHistoryQueryParams): Promise<LifecycleHistoryQueryResponse>;
    read(id: number): Promise<LifecycleHistoryResponse>;
}
export {};
