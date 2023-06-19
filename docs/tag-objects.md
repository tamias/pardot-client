# pardot-client - Tag Objects

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#tag-object
- https://developer.salesforce.com/docs/marketing/pardot/guide/tag-objects-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/tag-objects-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
type TagObjectType =
  | 'Automation'
  | 'Block'
  | 'Campaign'
  | 'Competitor'
  | 'Prospect Custom Field'
  | 'Custom URL'
  | 'Drip Program'
  | 'Email'
  | 'Email Draft'
  | 'Email Template'
  | 'Email Template Draft'
  | 'File'
  | 'Form'
  | 'Form Field'
  | 'Form Handler'
  | 'Group'
  | 'Keyword'
  | 'Landing Page'
  | 'Layout Template'
  | 'List'
  | 'Opportunity'
  | 'Paid Search Campaign'
  | 'Personalization'
  | 'Profile'
  | 'Prospect'
  | 'Prospect Default Account'
  | 'Segmentation Rule'
  | 'Site'
  | 'Site Search'
  | 'Social Message'
  | 'User'
  | 'Dynamic Content';

interface TagObject {
  id: number;
  tag_id: number;
  type: string;
  object_id: number;
  created_at: string;
}
```

## Methods

### query

Retrieve a list of tag objects according to the parameters.

```typescript
const queryResponse = await pardotClient.tagObjects.query(params);
```

#### Parameters

- params: TagObjectQueryParams (optional)

```typescript
interface TagObjectQueryParams {
  tag_id?: number;
  type?: TagObjectType;
  object_id?: number;
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

A query response containing zero, one, or more tag objects.

```typescript
interface TagObjectQueryResponse {
  result: {
    total_results: number;
    tagObject?: TagObject | TagObject[];
  };
}
```

---

### read

Retrieve a tag object by its id.

```typescript
const tagObjectResponse = await pardotClient.tagObjects.read(id);
```

#### Parameters

- id: Tag object id (required)

#### Return

A response containing a tag object.

```typescript
interface TagObjectResponse {
  tagObject: TagObject;
}
```
