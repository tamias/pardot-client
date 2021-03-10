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
    sort_by?: 'created_at' | 'id';
}
export interface LifecycleStageQueryResponse extends ResponseBase {
    result: {
        total_results: number;
        lifecycleStage: LifecycleStage | LifecycleStage[];
    };
}
export default class LifecycleStages extends ObjectsBase {
    objectName: string;
    query(params?: LifecycleStageSearchParams & LifecycleStageResultParams): Promise<LifecycleStageQueryResponse>;
}
export {};
