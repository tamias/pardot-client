# pardot-client - Prospect Accounts

## API Reference

- https://developer.pardot.com/kb/object-field-references/#prospect-account
- https://developer.pardot.com/kb/api-version-3/prospect-accounts/
- https://developer.pardot.com/kb/api-version-4/prospect-accounts/

### Version Note

Behaves the same in APIv3 and APIv4.

### Salesforce Connector Note

If the Pardot account has a Salesforce connector, then prospect accounts cannot be
modified by Pardot; attempting to modify prospect accounts via the API will
result in an error response.

## Object Types

```typescript
interface ProspectAccount {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  // custom fields
  [field: string]: unknown;
}

interface ProspectAccountField {
  '@attributes': {
    id: string;
    label: string;
    required: boolean;
    custom: boolean;
    type: string; // text, textarea, dropdown...
    has_options: boolean;
    option?: string[]; // always present if has_options is true 
  }
}
```

## Methods

### query

Retrieve a list of prospect accounts according to the parameters.

```typescript
const queryResponse = await pardotClient.prospectAccounts.query(params);
```

#### Parameters

- params: ProspectAccountQueryParams

```typescript
interface ProspectAccountQueryParams {
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

A query response containing zero, one, or more prospect accounts.

```typescript
interface ProspectAccountQueryResponse {
  result: {
    total_results: number;
    prospectAccount?: ProspectAccount | ProspectAccount[];
  };
}
```

---

### describe

Retrieve the field metadata for prospect accounts.

```typescript
const describeResponse = await pardotClient.prospectAccounts.describe();
```

#### Parameters

None

#### Return

Returns a response containing field metadata.

```typescript
interface ProspectAccountDescribeResponse {
  result: {
    field: ProspectAccountField[];
  };
}
```

---

### read

Retrieve a prospect account.

```typescript
const prospectAccount = await pardotClient.prospectAccounts.read(id);
```

#### Parameters

- id: Prospect account id (required)

#### Return

A response containing a prospect account.

```typescript
interface ProspectAccountResponse {
  prospectAccount: ProspectAccount;
}
```

---

### create

Create a prospect account.

```typescript
const prospectAccountResponse = await pardotClient.prospectAccounts.create(createData);
```

#### Parameters

- createData: [Prospect account](#object-types) object containing `name`; all other properties are optional (required)

#### Return

A response containing a prospect account.

```typescript
interface ProspectAccountResponse {
  prospectAccount: ProspectAccount;
}
```

---

### update

Update a prospect account.

```typescript
const prospectAccountResponse = await pardotClient.prospectAccounts.create(id, updateData);
```

#### Parameters

- id: Prospect account id (required)
- updateData: [Prospect account](#object-types) with all properties optional (required)

#### Return

A response containing a prospect account.

```typescript
interface ProspectAccountResponse {
  prospectAccount: ProspectAccount;
}
```

---

### assign

Assign a prospect to a prospect account.

```typescript
const assignResponse = await pardotClient.prospectAccounts.assign(id, prospectId);
```

#### Parameters

- id: Prospect account id (required)
- prospectId: Prospect id (required)

#### Return

To be determined.
