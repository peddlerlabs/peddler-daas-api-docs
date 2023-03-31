---
sidebar_position: 8
---

# Webhooks

We recommend creating a manifest including a valid webhook URI as part of the shipping object. This enables real time updates of the shipment status.
- The property `webhookUri` should be set on the shipping instance should you wish to use the webhook callbacks.
- Webhooks are responded to using a POST request to the provided URL
- Webhooks are triggered by any status update including those of individual shipments, i.e. when a specific delivery respective to a shipment has shipped.
- Webhooks should accept the JSON content type `application/json`
- Webhooks send a special `x-webhook-shared-token` header which is a secret token that can be set by the carrier and used for validation of the webhook
- You should always respond to POST request with a **200** OK status header, the body maybe empty.
- Webhooks have upto 3 shipments to a valid secure HTTPS url, in case the URL could not be reached or responds incorrectly.
- The body of the webhook contains valid JSON with the following parameters:

```json title="Webhook body"
{
    id: [string id of shipment],
    status: [string status of shipment]
}
```
