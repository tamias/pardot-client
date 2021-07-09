# pardot-client Tags

## API References

- https://developer.pardot.com/kb/object-field-references/#tag
- https://developer.pardot.com/kb/api-version-3/tags/
- https://developer.pardot.com/kb/api-version-4/tags/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of tags according to the parameters.

```typescript
const queryResponse = await pardotClient.tags.query(params);
```

#### Parameters

- params: TagQueryParams (optional)

```typescript
interface TagQueryParams {
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

A query response containing zero, one, or more tags.

```typescript
interface TagQueryResponse {
  result: {
    total_results: number;
    tag?: Tag | Tag[];
  };
}
```

---

### read

Retrieve a tag by its id.

```typescript
const tagResponse = await pardotClient.tags.read(id);
```

#### Parameters

- id: Tag id (required)

#### Return

A response containing a tag.

```typescript
interface TagResponse {
  tag: Tag;
}
```
