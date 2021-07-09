# pardot-client Dynamic Content

## API References

- https://developer.pardot.com/kb/object-field-references/#dynamic-content
- https://developer.pardot.com/kb/api-version-3/dynamic-content/
- https://developer.pardot.com/kb/api-version-4/dynamic-content/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface DynamicContentVariation {
  comparison: string;
  content: string;
}

interface DynamicContentItem {
  id: number;
  name: string;
  embedCode: string;
  embedUrl: string;
  baseContent: string;
  basedOn: string;
  variation: DynamicContentVariation | DynamicContentVariation[];
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of dynamic content items according to the parameters.

```typescript
const queryResponse = await pardotClient.dynamicContent.query(params);
```

#### Parameters

- params: DynamicContentQueryParams (optional)

```typescript
interface DynamicContentQueryParams {
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  updated_after?: DateString;
  updated_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id' | 'updated_at';
}
```

#### Return

A query response containing zero, one, or more dynamic content items.

```typescript
interface DynamicContentQueryResponse {
  result: {
    total_results: number;
    dynamicContent?: DynamicContentItem | DynamicContentItem[];
  };
}
```

### read

Retrieve a dynamic content item by its id.

```typescript
const dynamicContentResponse = await pardotClient.dynamicContent.read(id);
```

#### Parameters

- id: Dynamic content item id (required)

#### Return

A response containing a dynamic content item.

```typescript
interface DynamicContentResponse {
  dynamicContent: DynamicContentItem;
}
```
