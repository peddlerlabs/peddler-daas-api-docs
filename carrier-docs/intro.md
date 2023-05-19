---
sidebar_position: 1
---

# Enterprise Shipping Service

- The Peddler Enterprise Shipping Service API is a RESTful web service for developers to programmatically interact with Peddler's data and real-time shipment/delivery management services.
- All data exchanged between clients and the API is JSON (unless specified otherwise) over HTTPS.
- The base URL for the Peddler API is `https://api-lokl.peddler.com`
- Peddler utilises the CRUD standardised use of HTTP Action Verbs.
  - POST (create)
  - GET (read)
  - PUT (update/replace)
  - DELETE (remove)


:::tip Staging Environment

The Peddler API has a staging environment that can be used for testing purposes. The base URL for the staging environment is `https://alphadev-api.peddler.com`

:::

## High-level CRUD Operation examples

1. If you want to create a "shipment", you should send a *POST* request to the API as follows:  
    `https://api-lokl.peddler.com/api/carrier/{CARRIER_ID}/createShipments`
2. If you want to read a "shipment", you should send a *GET* request to the API as follows:  
    `https://api-lokl.peddler.com/api/carrier/{CARRIER_ID}/getShipmentStatuses?trackingNumbers`
3. If you want to read multiple "shipments", you should send a *GET* request to the API as follows:  
    `https://api-lokl.peddler.com/api/carrier/{CARRIER_ID}/getShipmentStatuses?trackingNumbers[0]=string&trackingNumbers[1]=string`
4. If you want to update a "shipment" in Peddler, you should send a *PUT* request to the API as follows:  
`https://api-lokl.peddler.com/api/carrier/{CARRIER_ID}/updateShipments`


- All parameters, where relevant, are required unless otherwise specified.
- Peddler API uses OAuth2 based authentication methods. All keys are provided by the peddler team and are available on request.
- If you have questions about using the API, want to share some feedback,
or have come across a bug you'd like to report, write us an email at *developers@peddler.com* 
or submit a request through our Support Center at [*helpdesk@peddler.com*](mailto:helpdesk@peddler.com).


:::danger Security Warning

We will never ask you for credentials/API keys so do not provide them.

:::

:::tip API Status

The Peddler API has 100% uptime and is monitored 24/7. To check the status of the API, check the following status page: [Peddler API System status](https://peddler.instatus.com/). If you are experiencing issues with the API, please contact us at [devops@peddler.com](mailto:devops@peddler.com).

:::