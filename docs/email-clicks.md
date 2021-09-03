# pardot-client - Email Clicks

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#email-clicks
- https://developer.salesforce.com/docs/marketing/pardot/guide/batch-email-clicks-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/batch-email-clicks-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface EmailClick {
  id: number;
  prospect_id: number;
  url: string;
  list_email_id?: number;
  drip_program_action_id?: number;
  email_template_id?: number;
  tracker_redirect_id?: number;
  created_at: string;
}
```

## Methods

### query

Retrieve a list of email clicks according to the parameters.

```typescript
const queryResponse = await pardotClient.emailClicks.query(params);
```

#### Parameters

- params: EmailClickQueryParams (optional)

```typescript
interface EmailClickQueryParams {
  id_greater_than?: number;
  created_after?: DateString;
  created_before?: DateString;
  list_email_id?: number;
  drip_program_action_id?: number;
  email_template_id?: number;
  tracker_redirect_id?: number;
  limit?: number;
}
```

#### Return

A query response containing zero, one, or more email clicks.

```typescript
interface EmailClickQueryResponse extends ResponseBase {
  result: {
    total_results: number;
    emailClick?: EmailClick | EmailClick[];
  };
}
```
