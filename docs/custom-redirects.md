# pardot-client - Custom Redirects

## API References

- https://developer.pardot.com/kb/object-field-references/#custom-redirect
- https://developer.pardot.com/kb/api-version-3/custom-redirects/
- https://developer.pardot.com/kb/api-version-4/custom-redirects/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface CustomRedirect {
  id: number;
  name: string;
  url: string;
  destination_url: string;
  campaign: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of custom redirects according to the parameters.

```typescript
const queryResponse = await pardotClient.customRedirects.query(params);
```

#### Parameters

- params: CustomRedirectQueryParams (optional)

```typescript
interface CustomRedirectQueryParams {
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

A query response containing zero, one, or more custom redirects.

```typescript
interface CustomRedirectQueryResponse {
  result: {
    total_results: number;
    customRedirect?: CustomRedirect | CustomRedirect[];
  };
}
```

### read

Retrieve a custom redirect by its id.

```typescript
const customRedirectResponse = await pardotClient.customRedirects.read(id);
```

#### Parameters

- id: Custom redirect id (required)

#### Return

A response containing a custom redirect.

```typescript
interface CustomRedirectResponse {
  customRedirect: CustomRedirect;
}
```
