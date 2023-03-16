---
sidebar_position: 2
---

# JWT Assertion

## Overview

The JWT assertion is a JSON Web Token (JWT) that is used to authenticate a client application with the Peddler API. The JWT assertion is signed with a private key and contains the following claims:

- `iss` (issuer) - The client id of the application
- `sub` (subject) - The user id of the resource owner
- `aud` (audience) - The Peddler API base URL token path
- `exp` (expiration time) - The expiration time of the JWT assertion
- `iat` (issued at) - The time the JWT assertion was issued

The JWT assertion is used to obtain an `accessToken` which is used to make requests to protected endpoints and access/create/modify underlying resources.

## JWT Assertion creation

The JWT assertion is created by signing a JSON object with the private key. The JSON object contains the claims listed above. The JWT assertion is then sent to the Peddler API to obtain an `accessToken`.

The JWT assertion is created using the following steps:

1. Create a JSON object containing the claims listed above
2. Sign the JSON object with the private key
3. Encode the signed JSON object using Base64 URL encoding

```js
const jwt = require('jws');

// Load the SSL credentials
const sslCerts = require('./../private/ssl_cert'); // RSA KEY PROVIDED

// Construct the claim
const payload = {
  iss: '123', // issuer - client id
  sub: 'bob', // subject - the resource owner id/username/email
  aud: '/oauth/token', // audience
  exp: Date.now() + 10000, // expiration time of claim  ISO-8601 
  iat: Date.now(), // issued at time of claim  ISO-8601 
  scope: ['DEFAULT', 'authenticated'] // a list of oAuth 2.0 scopes
};

const body = {
  header: { alg: 'RS256' },
  privateKey: sslCerts.privateKey,
  payload: payload
};

// Create a JWT assertion
const assertion = jwt.sign(body);
```

:::tip Note

- Scopes are always `DEFAULT` & `authenticated` unless instructed otherwise.
- Client authentication with JWT spec a refresh token is not generated.

:::

## JWT Assertion for an access token

The JWT assertion is sent to the Peddler API to obtain an `accessToken`. The `accessToken` is used to make requests to protected endpoints and access/create/modify underlying resources.

```js
js
const form = {
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  assertion: assertion
};

const request = require('request');
request.post({
  url: '/oauth/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: form
}, function(err, res, body) {
  console.log(err, body);
});
```

## Receiving the bearer token (in the body, in json)

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "access_token":"FkzdyJV14zc73AaK9FmNCtyp5bUTegis",
  "expires_in":7200,
  "scope":"DEFAULT authenticated",
  "token_type":"Bearer"
}
```

OR

```
HTTP/1.1 403 FORBIDDEN
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "error":"access_denied",
  "error_description":"Invalid subject: test" 
}

```

