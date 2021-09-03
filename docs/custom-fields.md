# pardot-client - Custom Fields

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#custom-field
- https://developer.salesforce.com/docs/marketing/pardot/guide/custom-fields-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/custom-fields-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface CustomField {
  id: number;
  name: string | null;
  field_id: string | null;
  type: string | null;
  type_id: number | null;
  created_at: string;
  updated_at: string;
  is_record_multiple_responses: boolean;
  crm_id: string | null;
  is_use_values: boolean;
  is_analytics_synced: boolean;
}
```

## Methods

### query

Retrieve a list of custom fields according to the parameters.

```typescript
const queryResponse = await pardotClient.customFields.query(params);
```

#### Parameters

- params: CustomFieldQueryParams (optional)

```typescript
interface CustomFieldQueryParams {
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id' | 'name';
}
```

#### Return

A query response containing zero, one, or more custom fields.

```typescript
interface CustomFieldQueryResponse {
  result: {
    total_results: number;
    customField?: CustomField | CustomField[];
  }
}
```

---

### read

Retrieve a custom field by its id.

```typescript
const customFieldResponse = await pardotClient.customFields.read(id);
```

#### Parameters

- id: Custom field id (required)

#### Return

A response containing a custom field.

```typescript
interface CustomFieldResponse {
  customField: CustomField;
}
```

---

### update

Update a custom field.

```typescript
const customFieldRresponse = await pardotClient.customFields.update(id, updateData);
```

#### Parameters

- id: Custom field id (required)
- updateData: [Custom field](#object-types) object with all fields optional (required)

#### Return

A response containing a custom field.

```typescript
interface CustomFieldResponse {
  customField: CustomField;
}
```

---

### create

Create a new custom field.

```typescript
const customFieldRresponse = await pardotClient.customFields.create(createData);
```

#### Parameters

- createData: [Custom field](#object-types) object containing `name` and `field_id`;
  all other properties are optional (required)

#### Return

A response containing a custom field.

```typescript
interface CustomFieldResponse {
  customField: CustomField;
}
```

---

### delete

Delete a custom field.

```typescript
await pardotClient.customFields.delete(id);
```

#### Parameters

- id: Custom field id (required)

#### Return

No return value.
