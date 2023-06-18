---
sidebar_position: 1
---

# Enterprise Shipping Service

- The Peddler Enterprise Shipping Service API is a RESTful web service for developers to programmatically interact with Peddler's data and real-time shipment/delivery management services.
- All data exchanged between clients and the API is JSON (unless specified otherwise) over HTTPS.
- The base URL for the staging environment of Peddler API is `https://alphadev-api.peddler.com`
- Peddler utilises the CRUD standardised use of HTTP Action Verbs.
  - POST (create)
  - GET (read)
  - PUT (update/replace)
  - DELETE (remove)


:::tip Production Environment

Once all testing has been done in the staging environment and desired results are obtained, the production environment can be used. The base URL for the production environment is `https://api-lokl.peddler.com`

:::

## High-level CRUD Operation examples

1. If you want to create a "shipment", you should send a *POST* request to the API as follows:  
    `https://alphadev-api.peddler.com/api/Carriers/{CARRIER_ID}/createShipments`
2. If you want to read a "shipment", you should send a *GET* request to the API as follows:  
    `https://alphadev-api.peddler.com/api/Carriers/{CARRIER_ID}/getShipmentStatuses?trackingNumbers`
3. If you want to read multiple "shipments", you should send a *GET* request to the API as follows:  
    `https://alphadev-api.peddler.com/api/Carriers/{CARRIER_ID}/getShipmentStatuses?trackingNumbers[0]=string&trackingNumbers[1]=string`


- All parameters, where relevant, are required unless otherwise specified.
- Peddler API uses OAuth2 based authentication methods. All keys are provided by the peddler team and are available on request.
- If you have questions about using the API, want to share some feedback,
or have come across a bug you'd like to report, write us an email at [*developers@peddler.com*](mailto:developers@peddler.com).


:::danger Security Warning

We will never ask you for credentials/API keys so do not provide them.

:::

:::tip API Status

The Peddler API has 100% uptime and is monitored 24/7. To check the status of the API, check the following status page: [Peddler API System status](https://peddler.instatus.com/). If you are experiencing issues with the API, please contact us by sending an email to [developers@peddler.com](mailto:developers@peddler.com).

:::