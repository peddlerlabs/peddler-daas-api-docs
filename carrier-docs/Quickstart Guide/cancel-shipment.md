---
sidebar_position: 6
---

# Cancel shipment

In this section, you will find the explanation of how to cancel a shipment.

## Cancel shipment request

To cancel a shipment, you need to send a `POST` request to the endpoint `/api/carrier/[CARRIER_ID]/cancelShipment` with the following body:

```json
{
  "shipment_id": "string",
  "reason": "string"
}
```

| Field | Type | Description |
|:---:|---|---|
| ``shipment_id`` | ``string`` | The shipment id |
| ``reason`` | ``string`` | The reason for the cancellation |

:::danger Important

Shipments maybe canceled if they are in the ADDED state else they are charged.

:::

## Cancel shipment response

The response will be a `200` status code with the following body:

```json
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

## Cancel shipment details

The details of the cancellation can be one of the following:

| DETAILS | Description |
|:---:|---|
| ``SHIPMENT_NOT_FOUND`` | The shipment could not be found |
| ``SHIPMENT_ALREADY_CANCELED`` | The shipment has already been canceled |
| ``SHIPMENT_ALREADY_DELIVERED`` | The shipment has already been delivered |
| ``SHIPMENT_ALREADY_RETURNED`` | The shipment has already been returned |
| ``SHIPMENT_ALREADY_ON_HOLD`` | The shipment has already been put on hold |
| ``SHIPMENT_ALREADY_IN_TRANSIT`` | The shipment has already been put in transit |
| ``SHIPMENT_ALREADY_IN_WAREHOUSE`` | The shipment has already been put in warehouse |
| ``SHIPMENT_ALREADY_OUT_FOR_DELIVERY`` | The shipment has already been put out for delivery |
| ``SHIPMENT_ALREADY_DELIVERED_COLLECTION_POINT`` | The shipment has already been delivered to a collection point |
| ``SHIPMENT_ALREADY_DELIVERED_NEIGHBOUR`` | The shipment has already been delivered to a neighbour |
| ``SHIPMENT_ALREADY_FAILED_ATTEMPT`` | The shipment has already failed an attempt |
| ``SHIPMENT_ALREADY_EXCEPTION`` | The shipment has already been put in exception |
| ``SHIPMENT_ALREADY_RETURNED_TO_SENDER`` | The shipment has already been returned to the sender |
| ``SHIPMENT_ALREADY_RETURNED_TO_WAREHOUSE`` | The shipment has already been returned to the warehouse |
| ``SHIPMENT_ALREADY_RETURNED_TO_COLLECTION_POINT`` | The shipment has already been returned to a collection point |
| ``SHIPMENT_ALREADY_RETURNED_TO_NEIGHBOUR`` | The shipment has already been returned to a neighbour |
