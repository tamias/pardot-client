import { BaseResultParameters, BaseSearchParameters, CustomFieldQueryResponse, CustomFieldResponse, UpdateCustomField } from '../types';
import ObjectsBase from './objects-base';
declare type CustomFieldSearchParameters = BaseSearchParameters;
interface ResultParameters extends BaseResultParameters {
    sort_by?: 'created_at' | 'id' | 'name';
}
export default class CustomFields extends ObjectsBase {
    objectName: string;
    query(params?: CustomFieldSearchParameters & ResultParameters): Promise<CustomFieldQueryResponse>;
    read(id: number): Promise<CustomFieldResponse>;
    update(id: number, update: UpdateCustomField): Promise<CustomFieldResponse>;
}
export {};
