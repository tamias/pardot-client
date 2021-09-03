# pardot-client - Lists

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#list
- https://developer.salesforce.com/docs/marketing/pardot/guide/lists-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/lists-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface List {
  id: number;
  name: string;
  is_public: boolean;
  is_dynamic: boolean;
  title: string | null;
  description: string | null;
  is_crm_visible: boolean;
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of lists according to the parameters.

```typescript
const queryResponse = await pardotClient.lists.query(params);
```

#### Parameters

- params: ListQueryParams (optional)

```typescript
interface ListQueryParams {
  name?: string;
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  updated_after?: DateString;
  updated_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at';
}
```

#### Return

A query response containing zero, one, or more lists.

```typescript
interface ListQueryResponse {
  result: {
    total_results: number;
    list?: List | List[];
  }
}
```

---

### read

Retrieve a list by its id.

```typescript
const listResponse = await pardotClient.lists.read(id);
```

#### Parameters

- id: List id (required)

#### Return

A response containing a list.

```typescript
interface ListResponse { 
  list: List;
}
```

---

### update

Update a list.

```typescript
const listResponse = await pardotClient.lists.update(id, updateData);
```

#### Parameters

- id: List id (required)
- listData: [List](#object-types) object with all properties optional (required)

#### Return

A response containing a list.

```typescript
interface ListResponse { 
  list: List;
}
```

---

### create

Create a new list.

```typescript
const listRresponse = await pardotClient.lists.create(createData);
```

#### Parameters

- createData: [List](#object-types) object with all properties optional (required)

#### Return

A response containing a list.

```typescript
interface CampaignResponse {
  campaign: Campaign;
}
```

---

### delete

Delete a list.

```typescript
await pardotClient.lists.delete(id);
```

#### Parameters

- id: List id (required)

#### Return

No return value.
