type GnuDateString = string; // http://www.gnu.org/software/tar/manual/html_node/Date-input-formats.html
export type DateString =
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'this_month'
  | 'last_month'
  | GnuDateString;

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

export type SortOrder = 'ascending' | 'descending';

export interface OutputParamsMobile {
  output: 'mobile';
}

export interface OutputParamsSimple {
  output: 'simple';
}

export interface OutputParamsFull {
  output?: 'full';
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

export type Update<T> = Partial<Omit<T, 'id'>>;

export type Create<T, K extends keyof Update<T> = null> = Update<T> & Pick<T, K>;
