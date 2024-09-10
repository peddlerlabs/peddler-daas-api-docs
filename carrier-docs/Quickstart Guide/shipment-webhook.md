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
  "ts": "JSON Date",
  "trackingUrl": "string",
  "code": "number",
  "failedStatus": "string",
  "details": {
    "lang": {
      "en": {
        "headline": "string",
        "description": "string"
      },
      "nl": {
        "headline": "string",
        "description": "string"
      }
    },
    "courierName": "string",
    "reason": "string"
  }
}
```

| Field | Type | Format | Description |
|:---:|---|---|---|
| ``id`` | ``string`` | ``string`` | The shipment ID |
| ``carrierTrackingNumber`` | ``string`` | ``string`` | The carrier tracking number |
| ``metaData`` | ``string`` | ``string`` | The metadata |
| ``status`` | ``string`` | ``string`` | The status of the shipment |
| ``ts`` | ``JSON Date`` | ``JSON Date`` | The timestamp of the shipment |
| ``trackingUrl`` | ``string`` | ``string`` | The tracking URL of the shipment |
| ``code`` | ``number`` | ``number`` | The code of the shipment |
| ``failedStatus`` | ``string`` | ``string`` | The failed status of the shipment |
| ``details`` | ``object`` | ``object`` | The details of the shipment status |


An example of a webhook body:

```json title="Webhook body"
{
  "id": "fx6_ZSWp0RDc24csBqOj9",
  "carrierTrackingNumber": "P199684830307745678",
  "metaData": "78420240902-2",
  "status": "FAILED_ATTEMPT",
  "location": null,
  "ts": "2024-09-02T13:08:06.574Z",
  "trackingUrl": "https://t.pdlr.nl/P199684830307745678/",
  "code": 601,
  "failedStatus": "CUSTOMER_NOT_PRESENT_NO_NEIGHBOURS",
  "details": {
    "lang": {
      "en": {
        "headline": "Delivery attempt failed",
        "description": "Delivery attempt failed at destination"
      },
      "nl": {
        "headline": "Afleverpoging mislukt",
        "description": "Afleverpoging mislukt op bestemming"
      }
    },
    "courierName": "Peddler",
    "reason": "Customer not answering; no neighbours available"
  }
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
  "ts": "2023-06-14T10:54:55.896Z",
  "trackingUrl": "https://t.pdlr.nl/P123456789012345678/",
  "code": 410
}
```