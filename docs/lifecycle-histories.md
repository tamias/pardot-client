# pardot-client - Lifecycle Histories

## API References

- https://developer.pardot.com/kb/object-field-references/#lifecycle-history
- https://developer.pardot.com/kb/api-version-3/lifecycle-histories/
- https://developer.pardot.com/kb/api-version-4/lifecycle-histories/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface LifecycleHistory {
  id: number;
  prospect_id: number;
  previous_stage_id: number | null;
  next_stage_id: number | null;
  seconds_elapsed: number | null;
  created_at: string;
}
```

## Methods

### query

Retrieve a list of lifecycle histories according to the parameters.

```typescript
const queryResponse = await pardotClient.lifecycleHistories.query(params);
```

#### Parameters

- params: LifecycleHistoryQueryParams (optional)

```typescript
interface LifecycleHistoryQueryParams {
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id';
}
```

#### Return

A query response containing zero, one, or more lifecycle histories.

```typescript
interface LifecycleHistoryQueryResponse {
  result: {
    total_results: number;
    lifecycleHistory?: LifecycleHistory | LifecycleHistory[];
  };
}
```

### read

Retrieve a lifecycle history by its id.

```typescript
const lifecycleHistoryResponse = await pardotClient.lifecycleHistories.read(id);
```

#### Parameters

- id: Lifecycle history id (required)

#### Return

A response containing a lifecycle history.

```typescript
interface LifecycleHistoryResponse {
  lifecycleHistory: LifecycleHistory;
}
```
