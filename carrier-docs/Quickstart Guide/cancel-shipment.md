---
sidebar_position: 6
---

# Cancel shipment

In this section, you will find the explanation of how to cancel a shipment.

## Cancel shipment request

To cancel a shipment, you need to send a `POST` request to the endpoint `/api/carrier/[CARRIER_ID]/cancelShipment` with the following body:

```json title="Request body"
{
  "trackingNumber": "string",
  "reason": "string"
}
```

| Field | Type | Description |
|:---:|---|---|
| ``trackingNumber`` | ``string`` | The shipment id |
| ``reason`` | ``string`` | The reason for the cancellation (optional) |

:::danger Important

Shipments maybe canceled if they are in the ADDED state else they are charged.

:::

## Cancel shipment response

The response will be a `200` status code with the following body:

```json title="Response body with 200 status"
{
  "status": "string",
  "details": "string"
}
```

The response will be a `404` status code with the following body if the tracking number is not valid or doesn't exist:

```json title="Response body with 404 status"
{
  "status": "string",
  "details": "string"
}
```

| Field | Type | Description |
|:---:|---|---|
| ``status`` | ``string`` | The status of the cancellation |
| ``details`` | ``string`` | The details of the cancellation |

## Cancel shipment status

The status of the cancellation can be one of the following:

| STATUS | Description |
|:---:|---|
| ``SUCCESS`` | The shipment has been successfully canceled |
| ``FAILED`` | The shipment could not be canceled |
