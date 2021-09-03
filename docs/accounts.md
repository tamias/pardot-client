# pardot-client - Accounts

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#account
- https://developer.salesforce.com/docs/marketing/pardot/guide/accounts-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/accounts-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface Account {
  id: number;
  company: string;
  level: string;
  website: string;
  vanity_domain: string;
  plugin_campaign_id: number;
  tracking_code_template: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  territory: string | null;
  zip: number | null;
  country: number | string | null; // should be a string, but in my test account the value is 0
  phone: string | null;
  fax: string | null;
  created_at: string;
  updated_at: string;
}
```

## Methods

### read

Retrieve account information for the API user.

```typescript
const accountResponse = await pardotClient.accounts.read();
```

#### Parameters

None.

#### Return

A response containing an account.

```typescript
interface AccountResponse {
  account: Account;
}
```
