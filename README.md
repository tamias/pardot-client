# pardot-client

pardot-client is a NodeJS library for Pardot API v3 and v4, using Salesforce single-sign on, implemented in Typescript.    

https://developer.salesforce.com/docs/marketing/pardot/overview

## Installation

```shell
npm install pardot-client
```

## Preparation

Before using this library, you must create a connected app in Salesforce and gather the necessary information, as
documented at https://developer.salesforce.com/docs/marketing/pardot/guide/getting-started.html

## Usage

### Instantiate Client

Instantiate a new PardotClient object.

```typescript
import PardotClient from 'pardot-client';

const pardotClientProps = {
  clientId: "",           // OAuth client id (required)
  clientSecret: "",       // OAuth client secret (required)
  redirectUri: "",        // OAuth redirect URI (required)
  businessUnitId: "",     // Business unit id for the Pardot account (required)
  token: {                // OAuth token for the Pardot account (optional)
    access_token: "",
    refresh_token: "",
  },
  baseUrl: "",            // Pardot API url (optional; default = 'pi.pardot.com')
  apiVersion: 4,          // Pardot API version (3 or 4) (optional; default = 4)
  refreshCallback: (token) => {},
                          // Callback called when access token is refreshed (optional)
};

const pardotClient = new PardotClient(pardotClientProps);
```

### Implement OAuth flow

1. Generate an authorize URL and direct the user to it.
3. After the user signs in and allows access, they will be redirected to the redirect URI with a `code` parameter.
4. Pass the code to `getAccessToken()` to request an access token.

```typescript
const authorizeUrlProps = {
  scope: [''],            // OAuth scope or scopes (optional)
  state: '',              // OAuth state; will be passed back to the redirect URI (optional)
}

const authorizeUrl = pardotClient.authorizeUrl(authorizeUrlProps);

// direct user to authorize URL

// handle request to redirect URI with code parameter

const accessToken = pardotClient.getAccessToken(code);

// store access token locally for later reuse
```

Once the Pardot client object has an access token, either from calling `getAccessToken()` or from passing `token` to
`new`, you are ready to make requests to the API!

### Token refresh

The Pardot client object will automatically refresh the token when it expires.  Use the refresh callback to store the
updated token locally.

```typescript
const pardotClient = new PardotClient({
  refreshCallback: async (token) => {
    // store access token locally
  },
});
```

### Requests and Responses

All methods return a Promise that resolves to the object returned by the API.

```typescript
const response = await pardotClient.prospects.query();

console.log(`Number of prospects: ${response.result.total_results}`);
```

For a successful request, the Pardot API returns a JSON response with the following structure, where the actual `key`
property and the structure of ResponseData depend on the request:

```typescript
interface SuccessResponse {
  '@attributes': {
    status: 'ok';
    version: number;
  }
  [key: string]: ResponseData;
}
```

For a failed request, the Pardot API returns a JSON response with the following structure:

```typescript
interface ErrorResponse {
  '@attributes': {
    err_code: number;
    stat: 'fail';
    version: number;
  }
  err: string;
}
```

Currently, the Pardot client simply returns that error response.  In the future, this may be changed to throw an error.

Requests are made using [Axios](https://www.npmjs.com/package/axios), which throws an error in an HTTP error occurs.

### Additional Usage Notes

#### Lists in Responses

Some responses may contain a list of items.  If there would only be one item in the list, the Pardot API returns the
item on its own not in a list.  For example:

```typescript
const responseMany = {
  "result": {
    // an array of items
    "prospect": [{ "id": 1 }, { "id": 2 }],
  },
};

const responseOne = {
  "result": {
    // a single item, not in an array
    "prospect": {"id": 1 },
  },
};
```

This can occur at the top level of a query response, or nested within a response, such as for
`opportunity.opportunity_activities.visitor_activity`.

#### Querying dates

Some query methods allow querying based on a date, such as by specifying a value for `created_before`.  The value can be
one of the fixed strings `'today'`, `'yesterday'`, `'last_7_days'`, `'this_month'` or `'last_month'`, or a date
formatted using [GNU Date Input Syntax](http://www.gnu.org/software/tar/manual/html_node/Date-input-formats.html).

## Pardot Objects

The Pardot client has a sub-object for each type of Pardot object.  For example, to perform operations on prospects,
you would call methods on `pardotClient.prospects`.  Refer to the documentation for each object for details.

* [Accounts](docs/accounts.md)
* [Campaigns](docs/campaigns.md)
* [Custom Fields](docs/custom-fields.md)
* [Custom Redirects](docs/custom-redirects.md)
* [Dynamic Content](docs/dynamic-content.md)
* [Emails](docs/emails.md)
* [Email Clicks](docs/email-clicks.md)
* [Email Templates](docs/email-templates.md)
* [Forms](docs/forms.md)
* [Lifecycle Histories](docs/lifecycle-histories.md)
* [Lifecycle Stages](docs/lifecycle-stages.md)
* [Lists](docs/lists.md)
* [List Memberships](docs/list-memberships.md)
* [Opportunities](docs/opportunities.md)
* [Prospects](docs/prospects.md)
* [Prospect Accounts](docs/prospects.md)
* [Tags](docs/tags.md)
* [Tag Objects](docs/tag-objects.md)
* [Users](docs/users.md)
* [Visitors](docs/visitors.md)
* [Visitor Activities](docs/visitor-activities.md)
* [Visits](docs/visits.md)

## License

[MIT](LICENSE)
