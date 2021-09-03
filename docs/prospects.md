# pardot-client - Prospects

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#prospect
- https://developer.salesforce.com/docs/marketing/pardot/guide/prospects-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/prospects-v4.html

### Version Note

https://developer.salesforce.com/docs/marketing/pardot/guide/transitioning-v3-v4.html#prospect-api-changes

### Output Format

Prospect endpoints take an optional `output` parameter to specify the level
of detail in the response. In order of increasing detail, the possible values
are "mobile", "simple", and "full", which is the default.

## Object Types

```typescript
interface ProspectMobile {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  company: string | null;
}

interface ProspectBase extends ProspectMobile {
  campaign_id: number | null;
  salutation?: string | null;
  password?: string | null;
  prospect_account_id?: number;
  website?: string | null;
  job_title?: string | null;
  department?: string | null;
  country?: string | null;
  address_one?: string | null;
  address_two?: string | null;
  city?: string | null;
  state?: string | null;
  territory?: string | null;
  zip?: string | null;
  phone?: string | null;
  fax?: string | null;
  source?: string | null;
  annual_revenue?: string | null;
  employees?: string | null;
  industry?: string | null;
  years_in_business?: string | null;
  comments?: string | null;
  notes?: string | null;
  score?: number | null;
  is_do_not_email: boolean | null;
  is_do_not_call: boolean | null;
  is_reviewed: boolean | null;
  is_starred: boolean | null;
  is_archived: boolean | null;
}

type LetterGrade =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F';

interface ProspectSimple extends ProspectBase {
  grade?: LetterGrade | null;
  last_activity_at?: string | null;
  recent_interaction?: string | null;
  crm_lead_fid?: string | null;
  crm_contact_fid?: string | null;
  crm_owner_fid?: string | null;
  crm_account_fid?: string | null;
  crm_last_sync?: string | null;
  crm_url?: string | null;
  opted_out: boolean | null;
  created_at: string;
  updated_at: string;
  campaign?: {
    id: number;
    name: string;
  };
  assigned_to?: unknown; // TODO - determine structure of user for assigned_to
  last_activity?: {
    visitor_activity: VisitorActivityMobile;
  };
  // custom fields
  [field: string]: unknown;
}

interface ProfileCriteria {
  id: number;
  name: string;
  matches: string;
}

interface ListSubscription {
  id: number;
  did_opt_in: boolean;
  did_opt_out: boolean;
  created_at: string;
  updated_at: string;
  list: List;
}

interface ProspectFull extends ProspectSimple {
  profile?: {
    id: number;
    name: string;
    profile_criteria: ProfileCriteria | ProfileCriteria[];
  };
  visitors?: {
    visitor: VisitorSimple | VisitorSimple[];
  } | null;
  visitor_activities?: {
    visitor_activity: VisitorActivityMobile | VisitorActivityMobile[];
  } | null;
  lists?: {
    list_subscription: ListSubscription | ListSubscription[];
  } | null;
}
```

## Methods

### query

Retrieve a list of prospects according to the parameters.

```typescript
const queryResponse = pardotClient.prospects.query(params);
```

#### Parameters

- params: ProspectQueryParams (optional)

```typescript
interface ProspectQueryParams {
  assigned?: boolean;
  assigned_to_user?: number | string; // user id or email
  deleted?: boolean;
  grade_equal_to?: LetterGrade;
  grade_greater_than?: LetterGrade;
  grade_less_than?: LetterGrade;
  is_starred?: boolean;
  last_activity_before?: DateString;
  last_activity_after?: DateString;
  last_activity_never?: boolean;
  list_id?: number;
  new?: boolean;
  score_equal_to?: number;
  score_greater_than?: number;
  score_less_than?: number;
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  updated_after?: DateString;
  updated_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  fields?: string[];
  sort_by?: 'created_at' | 'id' | 'probability' | 'value';
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A query response containing zero, one, or more prospects. The format depends
on the value of the `output` parameter. The query endpoint only returns
prospects in mobile or simple format; if `output` is "full", then simple
format is used.

If `output` is "mobile", all prospects are returned. Otherwise, at most 200
prospects are returned.

```typescript
interface ProspectQueryResponse {
  result: {
    total_results: number;
    prospect?: ProspectMobile | ProspectSimple | ProspectMobile[] | ProspectSimple[];
  };
}
```

---

### create

Create a prospect.

```typescript
const prospectResponse = await pardotClient.prospects.create(email, createData, params);
```

#### Parameters

- email: Email address for the prospect (required)
- createData: [Prospect base](#object-types) object with all properties optional
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### readByEmail

Retrieve a prospect by its email address.

```typescript
const prospectResponse = await pardotClient.prospects.readByEmail(email, params);
```

#### Parameters

- email: Prospect email address (required)
- params: ProspectReadParams (optional)

```typescript
interface ProspectReadParams {
  limit_related_records?: boolean;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### readById

Retrieve a prospect by its id.

```typescript
const prospectResponse = await pardotClient.prospects.readById(id, params);
```

#### Parameters

- id: Prospect id (required)
- params: ProspectReadParams (optional)

```typescript
interface ProspectReadParams {
  limit_related_records?: boolean;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### readByFid

Retrieve a prospect by its CRM foreign id.

```typescript
const prospectResponse = await pardotClient.prospects.readByFid(fid, params);
```

#### Parameters

- fid: Prospect CRM foreign id (required)
- params: ProspectReadParams (optional)

```typescript
interface ProspectReadParams {
  limit_related_records?: boolean;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### updateByEmail

Update a prospect by its email address.

```typescript
const prospectResponse = await pardotClient.prospects.updateByEmail(email, updateData, params);
```

#### Parameters

- email: Prospect email address (required)
- updateData: [Prospect base](#object-types) object with all properties optional (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### updateById

Update a prospect by its id.

```typescript
const prospectResponse = await pardotClient.prospects.updateById(id, updateData, params);
```

#### Parameters

- id: Prospect id (required)
- updateData: [Prospect base](#object-types) object with all properties optional (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### updateByFd

Update a prospect by its CRM foreign id.

```typescript
const prospectResponse = await pardotClient.prospects.updateByFid(fid, updateData, params);
```

#### Parameters

- fid: Prospect CRM foreign id (required)
- updateData: [Prospect base](#object-types) object with all properties optional (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### upsertByEmail

Upsert (update or insert) a prospect by its email address. In APIv4,
upserting by email always creates a new prospect.

```typescript
const prospectResponse = await pardotClient.prospects.upsertByEmail(email, upsertData, params);
```

#### Parameters

- email: Prospect email address (required)
- upsertData: [Prospect base](#object-types) with all properties optional
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### upsertById

Upsert (update or insert) a prospect by its id.

```typescript
const prospectResponse = await pardotClient.prospects.upsertById(id, upsertData, params);
```

#### Parameters

- id: Prospect id (required)
- upsertData: [Prospect base](#object-types) with all properties optional
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### upsertByFid

Upsert (update or insert) a prospect by its CRM foreign id.

```typescript
const prospectResponse = await pardotClient.prospects.upsertByFid(fid, upsertData, params);
```

#### Parameters

- fid: Prospect CRM foreign id (required)
- upsertData: [Prospect base](#object-types) with all properties optional
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### assignByEmail

Assign a prospect to a user or group by the prospect's email address.

```typescript
const prospectResponse = await pardotClient.prospects.assignByEmail(email, params);
```

#### Parameters

- email: Prospect email address (required)
- params: ProspectAssignParams (required)

```typescript
interface ProspectAssignParams {
  // must have exactly one of user_email, user_id, group_id
  user_email?: string;
  user_id?: number;
  group_id?: number;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### assignById

Assign a prospect to a user or group by the prospect's id.

```typescript
const prospectResponse = await pardotClient.prospects.assignById(id, params);
```

#### Parameters

- id: Prospect id (required)
- params: ProspectAssignParams (required)

```typescript
interface ProspectAssignParams {
  // must have exactly one of user_email, user_id, group_id
  user_email?: string;
  user_id?: number;
  group_id?: number;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### assignByFid

Assign a prospect to a user or group by the prospect's CRM foreign id.

```typescript
const prospectResponse = await pardotClient.prospects.assignByFid(fid, params);
```

#### Parameters

- fid: Prospect CRM foreign id (required)
- params: ProspectAssignParams (required)

```typescript
interface ProspectAssignParams {
  // must have exactly one of user_email, user_id, group_id
  user_email?: string;
  user_id?: number;
  group_id?: number;
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### unassignByEmail

Unassign a prospect from its user or group by the prospect's email address.

```typescript
const prospectResponse = await pardotClient.unassignByEmail(email, params);
```

#### Parameters

- email: Prospect email address (optional)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### unassignById

Unassign a prospect from its user or group by the prospect's id

```typescript
const prospectResponse = await pardotClient.unassignByEmail(email, params);
```

#### Parameters

- id: Prospect id (optional)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```

---

### unassignByFid

Unassign a prospect from its user or group by the prospect's CRM foreign id.

```typescript
const prospectResponse = await pardotClient.unassignByFid(fid, params);
```

#### Parameters

- fid: Prospect CRM foreign id (optional)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing a prospect. The format depends on the value of the
`output` parameter.

```typescript
interface ProspectResponse {
  prospect: ProspectMobile | ProspectSimple | ProspectFull;
}
```
