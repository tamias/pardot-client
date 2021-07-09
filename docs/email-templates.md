# pardot-client - Email Templates

## API References

- https://developer.pardot.com/kb/api-version-3/email-templates/
- https://developer.pardot.com/kb/api-version-4/email-templates/

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
type Flag = 1 | 0 | null;

type EmailTemplate =
  | {
      error: 0;
      sendOptions: {
        sendFromAccountOwner: Flag;
        isTest: Flag;
        replyToAddress: string;
        sendFromData: string;
        abVersion: unknown | null;
      };
      id: number;
      name: string;
      htmlMessage: string;
      textMessage: string;
      trackedHtmlMessage: string;
      trackedTextMessage: string;
      fromName: string | null;
      isOneToOneEmail: Flag;
      isArchived: Flag;
      isAutoResponderEmail: Flag;
      isDripEmail: Flag;
      isListEmail: Flag;
      subject: string;
      emailType: number;
      type: number;
    }
  | {
      error: 1;
      errorCode: number;
      errorMessage: string;
    };

interface EmailTemplateOneToOne {
  id: number;
  name: string;
  fromName: string | null;
  isOneToOneEmail: Flag;
  isArchived: Flag;
  isAutoResponderEmail: Flag;
  isDripEmail: Flag;
  isListEmail: Flag;
  subject: string;
  emailType: number;
  type: number;
}
```

## Methods

### read

Retrieve an email template by its id.

```typescript
const emailTemplateResponse = await pardotClient.emailTemplates.read(id, params);
```

#### Parameters

- id: Email template id (required)
- params: EmailTemplateParams (optional)

```typescript
interface EmailTemplateParams {
  archived?: boolean;
}
```

#### Return

A response containing an email template.

```typescript
interface EmailTemplateResponse {
  emailTemplate: EmailTemplate;
}
```

---

### listOneToOne

Retrieve a list of email templates that are enabled for one-to-one emails.

```typescript
const listResponse = await pardotClient.emailTemplates.listOneToOne(params);
```

#### Parameters

- params: EmailTemplateParams (optional)

```typescript
interface EmailTemplateParams {
  archived?: boolean;
}
```

#### Return

A response containing a list of one-to-one email templates.

```typescript
interface EmailTemplateListResponse {
  emailTemplates: {
    error: number;
    count: number;
    // if present, will be a list even if only one item
    templates?: EmailTemplateOneToOne[];
  };
}
```
