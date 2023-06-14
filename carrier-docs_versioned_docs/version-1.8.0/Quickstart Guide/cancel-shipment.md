---
sidebar_position: 7
---

# Cancel shipment

In this section, you will find the explanation of how to cancel a shipment.

## Cancel shipment request

To cancel a shipment, you need to send a `POST` request to the endpoint `/api/Carriers/[CARRIER_ID]/cancelShipment/:trackingNumber` with the following body:

```json title="Request body"
{
  "cancelReason": "string",
  "destroyPackage": "boolean",
  "returnToSender": "boolean"
}
```

| Field | Type | Format | Description |
|:---:|---|---|---|
| ``cancelReason`` | <span style={{color: 'purple'}}>OPTIONAL</span> | ``string`` | The reason for the cancellation |
| ``destroyPackage`` | <span style={{color: 'purple'}}>OPTIONAL</span> | ``boolean`` | Whether the package should be destroyed |
| ``returnToSender`` | <span style={{color: 'purple'}}>OPTIONAL</span> | ``boolean`` | Whether the package should be returned to the sender |

:::danger Important

Shipments maybe canceled if they are in the ADDED state else they are charged.

:::

An example of a request:

```bash title="cURL example"
curl --location 'https://alphadev-api.peddler.com/api/Carriers/[CARRIER_ID]/cancelShipment/P123456789012345678' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <bearer-token-here>' \
--data '{
    "cancelReason": "Customer requested to receive a new variant"
}'
```

## Cancel shipment response

A standard response will be a `200` status code with the following body:

```json title="Response body with 200 status"
{
    "status": "<string>",
    "count": "<number>"
}
```

| Field | Type | Description |
|:---:|---|---|
| ``status`` | ``string`` | The status of the cancellation |
| ``count`` | ``number`` | The number of shipments canceled |

An example response body:

```json title="Response body example"
{
    "status": "SUCCESS",
    "count": 1
}
```

The response will be a `404` status code with the following body if the tracking number is not valid or doesn't exist:

```json title="Response body with 404 status"
{
    "error": {
        "statusCode": 404,
        "name": "tracking-number-not-found",
        "message": "TRACKING NUMBER NOT FOUND"
    }
}
```

| Field | Type | Description |
|:---:|---|---|
| ``statusCode`` | ``string`` | The status of the cancellation |
| ``name`` | ``string`` | The details of the cancellation |
| ``message`` | ``string`` | The message of the cancellation |

:::danger Important

The shipment cannot be cancel if it is in the ``DELIVERED`` or ``OUT_FOR_DELIVERY`` state. In such a case, you will receive the following as response:

```json title="Response body with 422 status"
{
    "error": {
        "statusCode": 422,
        "name": "shipment-status-does-not-allow-cancelation",
        "message": "SHIPMENT STATUS DOES NOT ALLOW CANCELATION"
    }
}
```

:::
