---
sidebar_position: 1
---

# OAuth 2.0 framework

Peddler utilises the **OAuth 2.0** Authorization Framework. The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to the Peddler HTTP services, on behalf of a resource owner (a retailer user who owns a store) by orchestrating an approval interaction between the resource owner and the HTTP service, or by allowing the third-party application to obtain access on its own behalf.

## Client authentication

For third party application for enterprise shipping services, we recommend our secure token based [client authentication](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/). 

The parameters required for client authentication are:

| Parameter | Description |
|:---:|:---:|
| `grant_type` | Set this to "client_credentials" |
| `client_id` | Your application's Client ID |
| `client_secret` | Your application's Client Secret |
| `scope` | The scope of the token. Includes `DEAFULT`, `authenticated` , `CARRIER_ID` |


:::danger Security

The `client_secret` should be stored securely in encrypted format or using key management tool.

:::

## Authentication flow

![Client authentication](/img/oauth_client_credentials.png)