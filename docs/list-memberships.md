# pardot-client - List Memberships

## API References

- https://developer.pardot.com/kb/object-field-references/#list-membership
- https://developer.pardot.com/kb/api-version-3/list-memberships/
- https://developer.pardot.com/kb/api-version-4/list-memberships/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface ListMembership {
  id: number;
  list_id: number;
  prospect_id: number;
  opted_out: boolean;
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of list memberships according to the parameters.

```typescript
const queryResponse = await pardotClient.listMemberships.query(params);
```

#### Parameters

- params: ListMembershipQueryParams

```typescript
interface ListMembershipQueryParams {
  deleted?: boolean;
  list_id?: number;
  id_greater_than?: number;
  id_less_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  updated_after?: DateString;
  updated_before?: DateString;
  limit?: number;
  offset?: number;
  sort_order?: 'ascending' | 'descending';
  sort_by?: 'created_at' | 'id';
}
```

#### Return

A query response containing zero, one, or more list memberships.

```typescript
interface ListMembershipQueryResponse {
  result: {
    total_results: number;
    list_membership?: ListMembership | ListMembership[];
  };
}
```

---

### read

Retrieve a list membership by list id and prospect id.

```typescript
const listMembershipResponse = await pardotClient.listMemberships.read(listId, prospectId);
```

#### Parameters

- listId: List id (required)
- prospectId: Prospect id (required)

#### Return

A response containing a list membership entry.

```typescript
interface ListMembershipResponse {
  list_membership: ListMembership;
}
```

---

### readById

Retrieve a list membership by its id.

```typescript
const listMembershipResponse = await pardotClient.listMemberships.readById(id);
```

#### Parameters

- id: List membership id (required)

#### Return

A response containing a list membership.

```typescript
interface ListMembershipResponse {
  list_membership: ListMembership;
}
```

---

### create

Create a new list membership.

```typescript
const listMembershipResponse = await pardotClient.listMemberships.create(
  listId,
  prospectId,
  createData,
);
```

#### Parameters

- listId: List id (required)
- prospectId: Prospect id (required)
- createData: [List membership](#object-types) object with all properties optional (required)

#### Return

A response containing a list membership.

```typescript
interface ListMembershipResponse {
  list_membership: ListMembership;
}
```

---

### update

Update a list membership by list id and prospect id.

```typescript
const listMembershipResponse = await pardotClient.listMemberships.update(
  listId,
  prospectid,
  updateData,
);
```

#### Parameters

- listId: List id (required)
- prospectId: Prospect id (required)
- updateData: [List membership](#object-types) object with all properties optional (required)

#### Return

A response containing a list membership.

```typescript
interface ListMembershipResponse {
  list_membership: ListMembership;
}
```

---

### updateById

Update a list membership by its id.

```typescript
const listMembershipResponse = await pardotClient.listMemberships.updateById(
  id,
  updateData,
);
```

#### Parameters

- id: List membership id (required)
- updateData: [List membership](#object-types) object with all properties optional (required)

#### Return

A response containing a list membership.

```typescript
interface ListMembershipResponse {
  list_membership: ListMembership;
}
```

---

### delete

Delete a list membership by list id and prospect id.

```typescript
await pardotClient.listMemberships.delete(listId, prospectId);
```

#### Parameters

- listId: List id (required)
- prospectId: Prospect id (required)

#### Return

No return value.

---

### deleteById

Delete a list membership by its id.

```typescript
await pardotClient.listMemberships.deleteById(id);
```

#### Parameters

- id: List membership id (required)

#### Return

No return value.
