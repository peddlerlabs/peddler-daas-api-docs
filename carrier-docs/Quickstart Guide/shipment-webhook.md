---
sidebar_position: 9
---

# Webhooks

We recommend creating a manifest including a valid webhook URI as part of the shipping object. This enables real time updates of the shipment status.
- The property `webhookUri` should be set on the shipping instance should you wish to use the webhook callbacks.
- Webhooks are responded to using a POST request to the provided URL
- Webhooks are triggered by any status update including those of individual shipments, i.e. when a specific delivery respective to a shipment has shipped.
- Webhooks should accept the JSON content type `application/json`
- Webhooks send a special `x-webhook-shared-token` header which is a secret token that can be set by the carrier and used for validation of the webhook
- You should always respond to POST request with a **200** OK status header, the body maybe empty.
- The body of the webhook contains valid JSON with the following parameters:

```json title="Webhook body"
{
  "id": "string",
  "carrierTrackingNumber": "string",
  "metaData": "string",
  "status": "string",
  "ts": "JSON Date"
}
```

| Field | Type | Format | Description |
|:---:|---|---|---|
| ``id`` | ``string`` | ``string`` | The shipment ID |
| ``carrierTrackingNumber`` | ``string`` | ``string`` | The carrier tracking number |
| ``metaData`` | ``string`` | ``string`` | The metadata |
| ``status`` | ``string`` | ``string`` | The status of the shipment |
| ``ts`` | ``JSON Date`` | ``JSON Date`` | The timestamp of the shipment |

An example of a webhook body:

```json title="Webhook body"
{
  "id": "Lc7rRTyivvk_lC0w8kLoU",
  "carrierTrackingNumber": "P123456789012345678",
  "metaData": "123456",
  "status": "SHIPMENT_CONFIRMED",
  "ts": "2021-06-01T12:00:00.000Z"
}
```

In case of statuses ``OUT_FOR_DELIVERY`` & ``DELIVERED`` the webhook body will also contain the location field with gps coordinates of the location where the status change took place.

An example of the same is as follows:

```json title="Webhook body"
{
  "id": "PlakFjJkuYatSCXFvDxTs",
  "carrierTrackingNumber": "P123456789012345678",
  "metaData": "SHIP_AMS_002",
  "status": "OUT_FOR_DELIVERY",
  "location": {
    "lat": 52.3409992,
    "lng": 4.8236365
  },
  "ts": "2023-06-14T10:54:55.896Z"
}
```