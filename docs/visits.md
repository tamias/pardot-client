# pardot-client - Visits

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#visit
- https://developer.salesforce.com/docs/marketing/pardot/guide/visits-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/visits-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface VisitorPageView {
  id: number;
  url: string;
  title: string;
  created_at: string;
}

interface Visit {
  id: number;
  visitor_id: number;
  prospect_id: number | null;
  visitor_page_view_count: number;
  first_visitor_page_view_at: string;
  last_visitor_page_view_at: string;
  duration_in_seconds: number;
  campaign_parameter: string | null;
  medium_parameter: string | null;
  source_parameter: string | null;
  content_parameter: string | null;
  term_parameter: string | null;
  created_at: string;
  updated_at: string;
  visitor_page_views: {
    visitor_page_view: VisitorPageView | VisitorPageView[];
  };
}
```

## Methods

### queryByIds

Retrieve a list of visits by their ids according to the parameters.

```typescript
const queryResponse = await pardotClient.visits.queryByIds(ids, params);
```

#### Parameters

- ids: Visit ids (required)
- params: VisitQueryParams (optional)

```typescript
interface VisitQueryParams {
  limit?: number;
  offset?: number;
}
```

#### Return

A query response containing zero, one, or more visits.

```typescript
interface VisitQueryResponse {
  result: {
    total_results: number;
    visit?: Visit | Visit[];
  };
}
```

---

### queryByVisitorIds

Retrieve a list of visits by their visitor ids according to the parameters.

```typescript
const queryResponse = await pardotClient.visits.queryByVisitorIds(visitorIds, params);
```

#### Parameters

- visitorIds: Visitor ids (required)
- params: VisitQueryParams (optional)

```typescript
interface VisitQueryParams {
  limit?: number;
  offset?: number;
}
```

#### Return

A query response containing zero, one, or more visits.

```typescript
interface VisitQueryResponse {
  result: {
    total_results: number;
    visit?: Visit | Visit[];
  };
}
```

---

### queryByProspectIds

Retrieve a list of visits by their prospect ids according to the parameters.

```typescript
const queryResponse = await pardotClient.visits.queryByProspectIds(prospectIds, params);
```

#### Parameters

- prospectIds: Prospect ids (required)
- params: VisitQueryParams (optional)

```typescript
interface VisitQueryParams {
  limit?: number;
  offset?: number;
}
```

#### Return

A query response containing zero, one, or more visits.

```typescript
interface VisitQueryResponse {
  result: {
    total_results: number;
    visit?: Visit | Visit[];
  };
}
```
