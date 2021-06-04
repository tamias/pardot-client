import { BaseResultParams, IdSearchParams, ResponseBase } from './types';
import ObjectsBase from './base';
export interface LifecycleStage {
    id: number;
    name: string;
    position: number;
    is_locked: boolean;
}
declare type LifecycleStageSearchParams = IdSearchParams;
interface LifecycleStageResultParams extends BaseResultParams {
    sort_by?: 'position' | 'id';
}
declare type LifecycleStageQueryParams = LifecycleStageSearchParams & LifecycleStageResultParams;
export interface LifecycleStageQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        lifecycleStage?: LifecycleStage | LifecycleStage[];
    };
}
export default class LifecycleStages extends ObjectsBase {
    objectName: string;
    query(params?: LifecycleStageQueryParams): Promise<LifecycleStageQueryResponse>;
}
export {};
