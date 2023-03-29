---
sidebar_position: 2
---

# Authentication

Construct your client authentication to generate an access token to access Peddler API resources. 
We recommend to implement this as a re-usable utility/service. (See [access token section](/carrier-docs/Authentication/client-auth)).
- The claim and corresponding assertion is required on a per store-owner and thus, per store basis, i.e. you can only book deliveries for a respective store per assertion not for multiple stores. 
- Peddler provides separate private keys for each carrier which takes into account various security considerations.
- We urge you to store private keys securely, utilising your selected [key management](https://en.wikipedia.org/wiki/Key_management) solution or secure storage vault.

:::danger Important

Keys should never be included or hard-coded into source code.

:::

**Example:**
```js title="Request"
const tokenResponse = await request
    .post(`${PEDDLER_API_DOMAIN}/oauth/token`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
        grant_type: 'client_credentials',
        client_id,
        client_secret,
        scope: ['DEFAULT', 'authenticated'].join(' ')
    })
    .timeout({
        response: 1000 * 60 * 3,
        deadline: 1000 * 60 * 5
    })
    .end(err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        const appToken = res.body; // token!
        console.log(appToken);
    };    
```

```json title="Response"
{
    "access_token":"FkzdyJV14zc73AaK9FmNCtyp5bUTegis",
    "expires_in":7200,
    "scope":"DEFAULT authenticated",
    "token_type":"Bearer"
}
```