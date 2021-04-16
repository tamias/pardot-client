export const DATE_STRINGS = {
  Last7Days: 'last_7_days',
  LastMonth: 'last_month',
  ThisMonth: 'this_month',
  Today: 'today',
  Yesterday: 'yesterday',
} as const;

export const SORT_ORDERS = {
  Ascending: 'ascending',
  Descending: 'descending',
} as const;

export const OUTPUT_FORMATS = {
  Full: 'full',
  Mobile: 'mobile',
  Simple: 'simple',
} as const;

export const OPPORTUNITY_STATUSES = {
  Lost: 'lost',
  Open: 'open',
  Won: 'won',
} as const;

export const VISITOR_ACTIVITY_TYPE_NAMES = {
  CustomRedirect: 'Custom Redirect',
  Email: 'Email',
  File: 'File',
  Form: 'Form',
  FormHandler: 'FormHandler',
  LandingPage: 'Landing Page',
  Visit: 'Visit',
} as const;
