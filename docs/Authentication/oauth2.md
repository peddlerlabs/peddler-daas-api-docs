---
sidebar_position: 1
---

# Oauth 2.0 framework
Peddler utilises the **OAuth 2.0** Authorization Framework. The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to the Peddler HTTP services,
on behalf of a resource owner (a retailer user who owns a store) by orchestrating an approval interaction between the resource owner and the HTTP service,
or by allowing the third-party application to obtain access on its own behalf.

## Client authentication with JWT
For third party application we recommend our secure client authentication with signed JWT token.
The advantage of this schema is that the client application is associated to a specific resource owner for example a user who owns a store. 
This way the client application can manage deliveries on behalf of a store. 

Each JWT private key is therefore either assigned:
- 1 private key (application) per "store-owner" (user)  
    OR
- 1 private key linked to multiple "store-owners" (users). 

Upon creating the JWT assertion, the "sub" (subject) parameter is used to vary which resource owner i.e. "user" the `accessToken` is created for.
AccessTokens are subsequently used to make requests to protected endpoints and access/create/modify underlying resources.

To get started with the API your require to have received the following:
 - 1 x issuer client id
 - 1 or more subjects, i.e. resource owner (user id's)
 - 1 x RSA private key for creating the JWT assertion

## Authentication flow

The client authentication flow is illustrated as follows:
![oauth2-jwt-client-authentication](https://gist.githubusercontent.com/Abinashbunty/ad23b81707f99157209f8121f598c641/raw/ddfd2fca18b499be5a45afc677c3f3f8408830f6/oauth2-jwt-authorization-grant.png)
