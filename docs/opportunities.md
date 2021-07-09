# pardot-client - Opportunities

## API References

- https://developer.pardot.com/kb/object-field-references/#opportunity
- https://developer.pardot.com/kb/api-version-3/opportunities/
- https://developer.pardot.com/kb/api-version-4/opportunities/

### Version Note

https://developer.pardot.com/kb/api-version-4/#opportunity-api-changes

### Salesforce Connector Note

If the Pardot account has a Salesforce connector, then opportunities cannot be
modified by Pardot; attempting to modify opportunities via the API will
result in an error response.

### Output Format

Opportunity endpoints take an optional `output` parameter to specify the level
of detail in the response. In order of increasing detail, the possible values
are "mobile", "simple", and "full", which is the default.

## Object Types

```typescript
interface OpportunityMobile {
  id: number;
  campaign_id: number;
  name: string;
  value: number;
  probability: number;
  type: string;
  stage: string;
  status: OpportunityStatus;
  closed_at: string;
  created_at: string;
  updated_at: string;
}

interface OpportunitySimple extends OpportunityMobile {
  campaign: {
    id: number;
    name: string;
  };
  prospects: {
    // TODO - determine what fields are present in prospects here
    prospect: unknown | unknown[];
  };
}

interface OpportunityFull extends OpportunitySimple {
  opportunity_activities: {
    visitor_activity: VisitorActivityMobile | VisitorActivityMobile[];
  };
}
```

## Methods

### query

Retrieve a list of opportunities according to the parameters.

```typescript
const queryResponse = pardotClient.opportunities.query(params);
```

#### Parameters

- params: OpportunityQueryParams (optional)

```typescript
interface OpportunityQueryParams {
  probability_greater_than?: number;
  probability_less_than?: number;
  prospect_email?: string;
  prospect_id?: number;
  value_greater_than?: number;
  value_less_than?: number;
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id' | 'probability' | 'value';
  output?: 'mobile' | 'simple' | 'full';
}
```

#### Return

A query response containing zero, one, or more opportunities. The format
depends on the value of the `output` parameter.

If `output` is "mobile", all opportunities are returned. Otherwise, at most
200 opportunities are returned.

```typescript
interface OpportunityQueryResponse {
  result: {
    total_results: number;
    opportunity?:
      | OpportunityMobile
      | OpportunitySimple
      | OpportunityFull
      | OpportunityMobile[]
      | OpportunitySimple[]
      | OpportunityFull[];
  };
}
```

---

### read

Retrieve an opportunity by its id.

```typescript
const opportunityResponse = pardotClient.opportunities.read(id, params);
```

#### Parameters

- id: Opportunity id (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing an opportunity. The format depends on the value of
the `output` parameter.

```typescript
interface OpportunityResponse {
  opportunity: OpportunityMobile | OpportunitySimple | OpportunityFull;
}
```

---

### createByEmail

Create a new opportunity for the prospect with the specified email address.

```typescript
const opportunityResponse = await pardotClient.opportunities.createByEmail(
  prospectEmail,
  createData,
  params,
);
```

#### Parameters

- prospectEmail: The email address of the prospect (required)
- createData: [Opportunity](#object-types) object containing `campaign_id`, `name`, `value`, and `probability` properties (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing an opportunity. The format depends on the value of
the `output` parameter.

```typescript
interface OpportunityResponse {
  opportunity: OpportunityMobile | OpportunitySimple | OpportunityFull;
}
```

---

### createById

Create a new opportunity for the prospect with the specified id.

```typescript
const opportunityResponse = await pardotClient.opportunities.createById(
  prospectId,
  createData,
  params,
);
```

#### Parameters

- prospectId: The id of the prospect (required)
- createData: [Opportunity](#object-types) object containing `campaign_id`, `name`, `value`, and `probability` properties (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing an opportunity. The format depends on the value of
the `output` parameter.

```typescript
interface OpportunityResponse {
  opportunity: OpportunityMobile | OpportunitySimple | OpportunityFull;
}
```

---

### update

Update an opportunity.

```typescript
const opportunityResponse = await pardotClient.opportunities.update(id, updateData, params);
```

#### Parameters

- id: Opportunity id (required)
- updateData: [Opportunity](#object-types) object with all parameters optional (required)
- params: An object containing an optional `output` property (optional)

#### Return

A response containing an opportunity. The format depends on the value of
the `output` parameter.

```typescript
interface OpportunityResponse {
  opportunity: OpportunityMobile | OpportunitySimple | OpportunityFull;
}
```

---

### delete

Delete an opportunity.

```typescript
await pardotClient.opportunities.delete(id);
```

#### Parameters

- id: Opportunity id (required)

#### Return

No return value.

---

### undelete

Restore an opportunity that has been deleted.

```typescript
await pardotClient.opportunities.undelete(id);
```

#### Parameters

- id: Opportunity id (required)

#### Return

No return value.
