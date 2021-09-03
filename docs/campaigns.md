# pardot-client - Campaigns

## API References

- https://developer.salesforce.com/docs/marketing/pardot/guide/object-field-reference.html#campaign
- https://developer.salesforce.com/docs/marketing/pardot/guide/campaigns-v3.html
- https://developer.salesforce.com/docs/marketing/pardot/guide/campaigns-v4.html

### Version Note

Behaves the same in APIv3 and APIv4.

## Object Types

```typescript
interface Campaign {
  id: number;
  name: string;
  cost: number | null;
}
```

## Methods

### query

Retrieve a list of campaigns according to the parameters.

```typescript
const queryResponse = await pardotClient.campaigns.query(params);
```

#### Parameters

- params: CampaignQueryParams (optional)

```typescript
interface CampaignQueryParams {
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
  sort_by?: 'created_at' | 'id' | 'name' | 'updated_at' | 'cost';
}
```

#### Return

A query response containing zero, one, or more campaigns.

```typescript
interface CampaignQueryResponse {
  result: {
    total_results: number;
    campaign?: Campaign | Campaign[];
  };
}
```

---

### read

Retrieve a campaign by its id.

```typescript
const campaignResponse = await pardotClient.campaigns.read(id);
```

#### Parameters

- id: Campaign id (required)

#### Return

A response containing a campaign.

```typescript
interface CampaignResponse {
  campaign: Campaign;
}
```

---

### update

Update a campaign.

```typescript
const campaignResponse = await pardotClient.campaigns.update(id, updateData);
```

#### Parameters

- id: Campaign id (required)
- updateData: [Campaign](#object-types) object with all properties optional (required)

#### Return

A response containing a campaign.

```typescript
interface CampaignResponse {
  campaign: Campaign;
}
```

---

### create

Create a new campaign.

```typescript
const campaignResponse = await pardotClient.campaigns.create(createData);
```

#### Parameters

- createData: [Campaign](#object-types) with all properties optional (required)

#### Return

A response containing a campaign.

```typescript
interface CampaignResponse {
  campaign: Campaign;
}
```
