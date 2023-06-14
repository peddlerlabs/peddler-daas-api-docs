---
sidebar_position: 2
---

# Authentication

Construct your client authentication to generate an access token to access Peddler API resources. 
We recommend to implement this as a re-usable utility/service. (See [access token section](/carrier-docs/Authentication/client-auth)).
<!-- - The claim and corresponding assertion is required on a per store-owner and thus, per store basis, i.e. you can only book deliveries for a respective store per assertion not for multiple stores.  -->
- Peddler provides separate private keys for each carrier which takes into account various security considerations.
- We urge you to store private keys securely, utilising your selected [key management](https://en.wikipedia.org/wiki/Key_management) solution or secure storage vault.

:::danger Important

Keys should never be included or hard-coded into source code.

:::

:::info Note on CARRIER_ID

The `CARRIER_ID` is a unique identifier for your carrier account. It is provided to you by Peddler.

:::

**Example:**
```js title="Request"
const url = `${PEDDLER_API_DOMAIN}/oauth/token`;
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
const body = new URLSearchParams({
  grant_type: 'client_credentials',
  client_id,
  client_secret,
  scope: ['DEFAULT', 'authenticated', 'CARRIER_ID_HERE'].join(' ')
}).toString();

const tokenResponse = await fetch(url, {
  method: 'POST',
  headers,
  body,
  timeout: 1000 * 60 * 3
}).then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}).catch((error) => {
  console.error('There was a problem with the fetch operation:', error);
});    
```

```json title="Response"
{
    "access_token":"FkzdyJV14zc73AaK9FmNCtyp5bUTegis",
    "expires_in":7200,
    "scope":"DEFAULT authenticated",
    "token_type":"Bearer"
}
```