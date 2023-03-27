---
sidebar_position: 1
---

# Peddler API Docs

- The Peddler API is a RESTful web service for developers to programmatically interact with Peddler's data and real-time order/delivery management services.
- All data exchanged between clients and the API is JSON (unless specified otherwise) over HTTPS.
- The base URL for the Peddler API is `https://lokl-api.peddler.com`
- Peddler utilises the CRUD standardised use of HTTP Action Verbs.
  - POST (create)
  - GET (read)
  - PUT (update/replace)
  - DELETE (remove)

:::tip Staging Environment

The Peddler API has a staging environment that can be used for testing purposes. The base URL for the staging environment is `https://alphadev-api.peddler.com`

:::

**High-level CRUD Operation examples:**

1. If you want to create an "Order", you should send a *POST* request to the API as follows:  
    `https://lokl-api.peddler.com/api/Orders`
2. If you want to read an "Order", you should send a *GET* request to the API as follows:  
    `https://lokl-api.peddler.com/api/Orders/{id}`
3. If you want to read multiple "Orders", you should send a *GET* request to the API as follows:  
    `https://lokl-api.peddler.com/api/Orders/`
4. If you want to update an "Order" in Peddler, you should send a *PUT* request to the API as follows:  
`https://lokl-api.peddler.com/api/Orders/{id}`
5. If you want to add an delivery to an "Order" in Peddler, you should POST to the API:  
`https://lokl-api.peddler.com/api/Orders/{id}/deliveryLineItems/`

- All parameters, where relevant, are required unless otherwise specified.
- Peddler API uses OAuth2 based authentication methods. All keys are provided by the peddler team and are available on request.
- If you have questions about using the API, want to share some feedback,
or have come across a bug you'd like to report, write us an email at *developers@peddler.com* 
or submit a request through our Support Center at [*helpdesk@peddler.com*](mailto:helpdesk@peddler.com).

:::danger Security Warning

We will never ask you for credentials/API keys so do not provide them.

:::
