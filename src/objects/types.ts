import { DATE_STRINGS, OUTPUT_FORMATS, SORT_ORDERS } from './constants';

export type ValueOf<T> = T[keyof T];

type GnuDateString = string; // http://www.gnu.org/software/tar/manual/html_node/Date-input-formats.html

type DateStrings = typeof DATE_STRINGS;

export type DateString = ValueOf<DateStrings> | GnuDateString;

export interface IdSearchParams {
  id_greater_than?: number;
  id_less_than?: number;
}

export interface CreatedSearchParams {
  created_after?: DateString;
  created_before?: DateString;
}

export interface UpdatedSearchParams {
  updated_after?: DateString;
  updated_before?: DateString;
}

type SortOrders = typeof SORT_ORDERS;

export type SortOrder = ValueOf<SortOrders>;

export interface OutputParamsMobile {
  output: typeof OUTPUT_FORMATS.Mobile;
}

export interface OutputParamsSimple {
  output: typeof OUTPUT_FORMATS.Simple;
}

export interface OutputParamsFull {
  output?: typeof OUTPUT_FORMATS.Full;
}

export type OutputParams = OutputParamsMobile | OutputParamsSimple | OutputParamsFull;

export interface BaseResultParams {
  limit?: number;
  offset?: number;
  sort_order?: SortOrder;
  sort_by?: string; // sort_by values vary by object
}

export interface ResponseAttributes {
  status: 'ok';
  version: number;
}

export interface ResponseBase {
  '@attributes': ResponseAttributes;
}

export type Update<ObjectType> = Partial<Omit<ObjectType, 'id'>>;

export type Create<
  ObjectType,
  Required extends keyof Update<ObjectType> | null = null
> = Update<ObjectType> &
  (Required extends keyof Update<ObjectType> ? Pick<ObjectType, Required> : unknown);
