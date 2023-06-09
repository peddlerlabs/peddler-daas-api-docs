---
sidebar_position: 4
---

# Finalise delivery order

Once the order is ready to ship and the respective delivery line-items have been added, we finalise the order for delivery.
Upon finalising an order, it is processed by our PSP or accounts systems, it can not be modified once its status has changed from `CREATED` (more on statuses [here](/docs/Quickstart%20Guide/delivery-order-status-lifecycles.md#order-status)).
It is possible to programmatically CANCEL an order (see [Cancel order](/docs/Advanced%20delivery%20order%20endpoints%20and%20options/cancel-order.md)).

:::tip Notes 
- You will require the `id` property of the order for the `POST /api/Orders/${id}/completeOrder` endpoint.
- For client application a `paymentonaccount` value as the paymentData.method paramater is required for automated checkout and order completion.
- The order will be processed by the server. Once processed, a webhook is sent to the client application if the optional webhookUri is set. The webhook will respond with a status update to **PAID**.

:::

## Order completion request

```js title="Complete order"
request
    .post(`https://api-lokl.peddler.com/api/Orders/${id}/completeOrder`)
    .set('Authorization', `Bearer ${access_token}`)
    .send({
        paymentData: {
            method: 'paymentonaccount'
        }
    })
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        console.log(res);
    });
```

## Order completion response

- 200: OK. HTTP response, the body can be ignored.
- Further updates are sent via the order webhook

```json title="Response"
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "redirect":"https://www.peddler.com/api/Orders/{id}/completePayment" // ignore this is only relevant for web clients
}
```
