# pardot-client - Visitors

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#visitor
- https://developer.salesforce.com/docs/marketing/pardot/guide/visitors-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/visitors-v4.html

### Output Format

Visitor endpoints take an optional `output` parameter to specify the level of
detail in the response. In order of increasing detail, the possible values are
"mobile", "simple", and "full", which is the default.

### Version Note

https://developer.salesforce.com/docs/marketing/pardot/guide/transitioning-v3-v4.html#visitor-api-changes

## Object Types

```typescript
interface VisitorBase {
  id: number;
  page_view_count?: number;
  ip_address?: string;
  hostname?: string;
  created_at: string;
  updated_at: string;
}

interface VisitorMobile extends VisitorBase {
  prospect_id: number | null;
}

interface VisitorSimple extends VisitorMobile {
  browser: string | null;
  browser_version: string | null;
  operating_system: string | null;
  operating_system_version: string | null;
  language: string | null;
  screen_height: string | null;
  screen_width: string | null;
  is_flash_enabled: boolean | null;
  is_java_enabled: boolean | null;
  campaign_parameter?: string;
  medium_parameter?: string;
  source_parameter?: string;
  content_parameter?: string;
  term_parameter?: string;
}

interface VisitorReferrer {
  id: number;
  referrer: string;
  vendor: string | null;
  type: string | null;
  query: string | null;
}

interface VisitorFull extends VisitorBase {
  // full response contains prospect instead of prospect_id
  prospect?: ProspectMobile;
  identified_company?: {
    name: string | null;
    street_address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    email: string | null;
  };
  visitor_referrer: VisitorReferrer | VisitorReferrer[];
  visitor_activities: {
    visitor_activity: VisitorActivityMobile | VisitorActivityMobile[];
  };
}
```

## Methods

### query

Retrieve a list of visitors according to the parameters.

```typescript
const queryResponse = pardotClient.visitors.query(params);
```

#### Parameters

- params: VisitorQueryParams (optional)

```typescript
interface VisitorQueryParams {
  only_identified?: boolean;
  prospect_ids?: number[];
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  updated_after?: DateString;
  updated_before?: DateString;
  fields?: string[];
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id' | 'updated_at';
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A query response containing zero, one, or more visitors. The format depends on
the value of the `output` parameter.

If `output` is "mobile", all visitors are returned. Otherwise, at most 200
visitors are returned.

```typescript
interface VisitorQueryResponse {
  result: {
    total_results: number;
    visitor?:
      | VisitorMobile
      | VisitorSimple
      | VisitorFull
      | VisitorMobile[]
      | VisitorSimple[]
      | VisitorFull[];
  };
}
```

---

### read

Retrieve a visitor by its id.

```typescript
const visitorResponse = await pardotClient.visitors.read(id, params);
```

#### Parameters

- id: Visitor id (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a visitor. The format depends on the value of the
`output` parameter.

```typescript
interface VisitorResponse {
  visitor: VisitorMobile | VisitorSimple | VisitorFull;
}
```

---

### assign

Associate a visitor to a prospect.

```typescript
const visitorResponse = await pardotClient.visitors.assign(id, params);
```

#### Parameters

- id: Visitor id (required)
- params: VisitorAssignParams (required)

```typescript
interface VisitorAssignParams {
  // for APIv3, must specify prospect_id or prospect_email
  // for APIv4, must specify prospect_id
  prospect_id?: number;
  prospect_email?: string;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a visitor. The format depends on the value of the
`output` parameter.

```typescript
interface VisitorResponse {
  visitor: VisitorMobile | VisitorSimple | VisitorFull;
}
```
