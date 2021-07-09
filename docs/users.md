# pardot-client - Users

## API References

- https://developer.pardot.com/kb/object-field-references/#user
- https://developer.pardot.com/kb/api-version-3/users/
- https://developer.pardot.com/kb/api-version-4/users/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  job_title: string | null;
  role: string;
  account: number;
  timezone: string;
  created_at: string;
  updated_at: string;
}
```

## Methods

### query

Retrieve a list of users according to the parameters.

```typescript
const queryResponse = await pardotClient.users.query(params);
```

#### Parameters

- params: UserQueryParams(optional)

```typescript
interface UserQueryParams {
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

A query response containing zero, one, or more users.

```typescript
interface UserQueryResponse {
  result: {
    total_results: number;
    user?: User | User[];
  };
}
```

### readById

Retrieve a user by its id.

```typescript
const userResponse = pardotClients.users.readById(id);
```

#### Parameters

- id: User id (required)

#### Return

A response containing a user.

```typescript
interface UserResponse {
  user: User;
}
```

### readByEmail

Retrieve a user by its email address.

```typescript
const userResponse = pardotClients.users.readByEmail(email);
```

#### Parameters

- email: User email address (required)

#### Return

A response containing a user.

```typescript
interface UserResponse {
  user: User;
}
```
