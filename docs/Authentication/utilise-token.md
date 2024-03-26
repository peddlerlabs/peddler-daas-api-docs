---
sidebar_position: 3
---

# Utilising access token
Peddler uses Bearer tokens for any request, i.e. all requests to our api require a bearer token without exception.
The client accesses the protected resources by presenting the access token to the resource server. 
The client can use the HTTP Authorization header (recommended) or `access_token` query parameter.

**For example**:

```json
GET /protected/protected-apis.html HTTP/1.1
Host: localhost:3001
Authorization: Bearer cdtXRlBcXBSWrdc6vZbCFGiq3ZUhl0BF
```
OR

```json
GET /protected/protected-apis.html?access_token=cdtXRlBcXBSWrdc6vZbCFGiq3ZUhl0BF HTTP/1.1
Host: localhost:3001
```

## Access tokens expiry
By default, access tokens on Peddler are short lived in most cases `7200 seconds` (i.e. 2 hours). 
The developer should make no assumption around the validity or state of an access token or the expiry term.
The access token can be revoked at the discretion of the Peddler API.

## Recommended strategy
We advice to create a reusable service/utility to retrieve access tokens,
and utilise them for the respective series of requests until a new access token is deemed necessary.
New tokens are required when your client receives the following HTTP status code responses upon making a request:
- 401 `UNAUTHORIZED`
- 498 `TOKEN_EXPIRED`

:::tip Note

We do not recommend creating a new access token for each request as you could exceed your rate limit with large amounts of requests.
Therefore, a utility that renews the access token is preferable, upon receiving a **401** or **498** error and re-attempting the request.

:::
