# pardot-client - Visitor Activities

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#visitor-activity
- https://developer.salesforce.com/docs/marketing/pardot/guide/visitor-activities-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/visitor-activities-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

### Output Format

Visitor Activity endpoints take an optional `output` parameter to specify the
level of detail in the response. In order of increasing detail, the possible
values are "mobile", "simple", and "full", which is the default.

## Object Types

```typescript
interface VisitorActivityBase {
  id: number;
  visitor_id?: number;
  prospect_id?: number;
  type: number;
  type_name: VisitorActivityTypeName;
  details: string;
  campaign: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface VisitorActivityMobileCustomRedirect extends VisitorActivityBase {
  type_name: 'Custom Redirect';
  custom_redirect_id: number;
}
interface VisitorActivityMobileEmail extends VisitorActivityBase {
  type_name: 'Email';
  email_id: number;
  list_email_id: number;
}
interface VisitorActivityMobileFile extends VisitorActivityBase {
  type_name: 'File';
  file_id: number;
}
interface VisitorActivityMobileForm extends VisitorActivityBase {
  type_name: 'Form';
  form_id: number;
}
interface VisitorActivityMobileFormHandler extends VisitorActivityBase {
  type_name: 'FormHandler';
  form_handler_id: number;
}
interface VisitorActivityMobileLandingPage extends VisitorActivityBase {
  type_name: 'Landing Page';
  landing_page_id: number;
}
interface VisitorActivityMobileVisit extends VisitorActivityBase {
  type_name: 'Visit';
  visit_id: number;
}

type VisitorActivityMobile =
  | VisitorActivityMobileCustomRedirect
  | VisitorActivityMobileEmail
  | VisitorActivityMobileFile
  | VisitorActivityMobileForm
  | VisitorActivityMobileFormHandler
  | VisitorActivityMobileLandingPage
  | VisitorActivityMobileVisit;

type VisitorActivitySimple = VisitorActivityMobile;

interface VisitorActivityInfo {
  name: string;
  app_url: string;
}

interface VisitorActivityFullCustomRedirect extends VisitorActivityMobileCustomRedirect {
  custom_redirect: VisitorActivityInfo;
}
interface VisitorActivityFullEmail extends VisitorActivityMobileEmail {
  email: VisitorActivityInfo;
}
interface VisitorActivityFullFile extends VisitorActivityMobileFile {
  file: VisitorActivityInfo;
}
interface VisitorActivityFullForm extends VisitorActivityMobileForm {
  form: VisitorActivityInfo;
}
interface VisitorActivityFullFormHandler extends VisitorActivityMobileFormHandler {
  form_handler: VisitorActivityInfo;
}
interface VisitorActivityFullLandingPage extends VisitorActivityMobileLandingPage {
  landing_page: VisitorActivityInfo;
}
type VisitorActivityFullVisit = VisitorActivityMobileVisit;

export type VisitorActivityFull =
  | VisitorActivityFullCustomRedirect
  | VisitorActivityFullEmail
  | VisitorActivityFullFile
  | VisitorActivityFullForm
  | VisitorActivityFullFormHandler
  | VisitorActivityFullLandingPage
  | VisitorActivityFullVisit;
```

## Methods

### query

Retrieve a list of visitor activities according to the parameters.

```typescript
const queryResponse = pardotClient.visitorActivities.query(params);
```

#### Parameters

- params: VisitorActivityQueryParams (optional)

```typescript
interface VisitorActivityQueryParams {
  prospect_only?: boolean;
  type?: number | number[];

  // object types
  custom_url_only?: boolean;
  email_only?: boolean;
  file_only?: boolean;
  form_only?: boolean;
  form_handler_only?: boolean;
  landing_page_only?: boolean;

  // relationships
  campaign_id?: number | number[];
  custom_url_id?: number | number[];
  email_id?: number | number[];
  file_id?: number | number[];
  form_id?: number | number[];
  form_handler_id?: number | number[];
  landing_page_id?: number | number[];
  prospect_id?: number | number[];
  visitor_id?: number | number[];

  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  updated_after?: DateString;
  updated_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id' | 'prospect_id' | 'visitor_id' | 'updated_at';
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A query response containing zero, one, or more visitor activities. The format
depends on the value of the `output` parameter.

```typescript
interface VisitorActivityQueryResponse {
  result: {
    total_results: number;
    visitor_activity?:
      | VisitorActivityMobile
      | VisitorActivitySimple
      | VisitorActivityFull
      | VisitorActivityMobile[]
      | VisitorActivitySimple[]
      | VisitorActivityFull[];
  };
}
```

---

### read

Retrieve a visitor activity by its id.

```typescript
const visitorActivityResponse = pardotClient.visitorActivities.read(id, params);
```

#### Parameters

- id: Visitor activity id (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a visitor activity. The format depends on the value of
the `output` parameter.

```typescript
interface VisitorActivityResponse {
  visitor_activity: VisitorActivityMobile | VisitorActivitySimple | VisitorActivityFull;
}
```
