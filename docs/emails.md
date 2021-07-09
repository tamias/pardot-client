# pardot-client - Emails

## API References

- https://developer.pardot.com/kb/object-field-references/#email
- https://developer.pardot.com/kb/api-version-3/emails/
- https://developer.pardot.com/kb/api-version-4/emails/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface Email {
  id: number;
  name: string;
  subject: string;
  message: string;
  created_at: string;
}

interface EmailStats {
  sent: number;
  delivered: number;
  total_clicks: number;
  unique_clicks: number;
  soft_bounced: number;
  hard_bounced: number;
  opt_outs: number;
  spam_complaints: number;
  opens: number;
  unique_opens: number;
  delivery_rate: number;
  opens_rate: number;
  click_through_rate: number;
  unique_click_through_rate: number;
  click_open_ratio: number;
  out_out_rate: number;
  spam_complaint_rate: number;
}
```

## Methods

### read

Retrieve an email by its id.

```typescript
const emailResponse = await pardotClient.emails.read(id);
```

#### Parameters

- id: Email id (required)

#### Return

A response containing an email.

```typescript
interface EmailResponse {
  email: Email;
}
```

### stats

Retrieve stats for an email by its id.

```typescript
const emailStatsResponse = await pardotClient.emails.stats(id);
```

#### Parameters

- id: Email id (required)

#### Return

A response containing stats for an email.

```typescript
interface EmailStatsResponse {
  stats: EmailStats;
}
```

### sendToEmail

Send an email to a single prospect, specified by email address.

```typescript
const emailResponse = await pardotClient.emails.sendToEmail(prospectEmail, params);
```

#### Parameters

- prospectEmail: Email address of a prospect (required)
- params: EmailSendParams (required)

```typescript
type EmailSendParams = {
  campaign_id: number;
} & (
  | {
      email_template_id: number;
    }
  | ({
      text_content: string;
      name: string;
      subject: string;
    } & (
      | {
          from_email: string;
          from_name: string;
        }
      | { from_user_id: number }
    ))
);
```

#### Return

A response containing an email.

```typescript
interface EmailResponse {
  email: Email;
}
```

### sendToId

Send an email to a single prospect, specified by prospect id.

```typescript
const emailResponse = await pardotClient.emails.sendToEmail(id, params);
```

#### Parameters

- id: Prospect id (required)
- params: EmailSendParams (required)

(See definition of EmailSendParams under [sendToEmail](#sendtoemail) above.)

#### Return

A response containing an email.

```typescript
interface EmailResponse {
  email: Email;
}
```

### sendToLists

Send an email to every prospect on the specified list(s).

```typescript
const emailResponse = await pardot.emails.sendToLists(listIds, params);
```

#### Parameters

- listIds: Array of list ids (required)
- params: EmailSendParams (required)

(See definition of EmailSendParams under [sendToEmail](#sendtoemail) above.)

#### Return

A response containing an email.

```typescript
interface EmailResponse {
  email: Email;
}
```
