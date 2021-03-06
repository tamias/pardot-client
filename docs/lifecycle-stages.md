# pardot-client - Lifecycle Stages

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#lifecycle-stage
- https://developer.salesforce.com/docs/marketing/pardot/guide/lifecycle-stages-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/lifecycle-stages-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface LifecycleStage {
  id: number;
  name: string;
  position: number;
  is_locked: boolean;
}
```

## Methods

### query

Retrieve a list of lifecycle stages according to the parameters.

```typescript
const queryResponse = await pardotClient.lifecycleStages.query(params);
```

#### Parameters

- params: LifecycleStageQueryParams (optional)

```typescript
interface LifecycleStageQueryParams {
  id_greater_than?: number;
  id_less_than?: number;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'position' | 'id';
}
```

#### Return

A query response containing zero, one, or more lifecycle stages.

```typescript
interface LifecycleStageQueryResponse {
  result: {
    total_results: number;
    lifecycleStage?: LifecycleStage | LifecycleStage[];
  };
}
```
