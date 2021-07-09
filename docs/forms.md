# pardot-client - Forms

## API References

- https://developer.pardot.com/kb/object-field-references/#form
- https://developer.pardot.com/kb/api-version-3/forms/
- https://developer.pardot.com/kb/api-version-4/forms/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface Form {
  id: number;
  name: string;
  campaign: {
    id: number;
    name: string;
  };
  embedCode: string;
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of forms according to the parameters.

```typescript
const queryResponse = await pardot.forms.query(params);
```

#### Parameters

- params: FormQueryParams (optional)

```typescript
interface FormQueryParams {
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

A query response containing zero, one, or more forms.

```typescript
interface FormQueryResponse {
  result: {
    total_results: number;
    form?: Form | Form[];
  };
}
```

### read

Retrieve a form by its id.

```typescript
const formResponse = await pardotClient.forms.read(id);
```

#### Parameters

- id: Form id (required)

#### Return

A response containing a form.

```typescript
interface FormResponse {
  form: Form;
}
```
