---
sidebar_position: 2
---

# Authentication

Construct your JWT assertion, then exchange for an access token. 
We recommend to implement this as a re-usable utility/service. (See [access token section](/docs/Authentication/jwt-assertion)).
- The claim and corresponding assertion is required on a per store-owner and thus, per store basis, i.e. you can only book deliveries for a respective store per assertion not for multiple stores. 
- Peddler provides separate private keys for each store which takes into account various security considerations.
- We urge you to store private keys securely, utilising your selected key management solution or secure storage vault.

:::danger Important

Keys should never be included or hard-coded into source code.

:::

***Example:***
```js title="Request"
const payload = {
    iss: 'provided_app_id', // issuer - client id
    sub: 'store_owner_id', // subject - the resource owner id/username/email
    aud: '/oauth/token', // audience
    exp: Date.now() + 10000, // expiration time of claim
    iat: Date.now(), // issued at time of claim
    scope: ['DEFAULT', 'authenticated'] // a list of oAuth 2.0 scopes
};

const body = {
    header: { alg: 'RS256' },
    privateKey: app.key,
    payload
};

// Create a JWT assertion
const assertion = jwt.sign(body);

request
    .post('https://api-lokl.peddler.com/oauth/token') //end point
    .set('Content-Type', 'application/x-www-form-urlencoded') //header
    .send({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion
    })
    .end(err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        const appToken = res.body; // token!
        console.log(appToken);
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