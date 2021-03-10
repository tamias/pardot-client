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

export interface BaseResultParams {
  format?: 'json' | 'xml';
  limit?: number;
  offset?: number;
  sort_order?: SortOrder;
  // sort_by values vary by object
}

export interface ResponseAttributes {
  status: 'ok';
  version: number;
}

export interface ResponseBase {
  '@attributes': ResponseAttributes;
}

export type Update<T> = Partial<Omit<T, 'id'>>;
