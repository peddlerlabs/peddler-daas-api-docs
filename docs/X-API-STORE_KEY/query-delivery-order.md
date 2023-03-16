---
sidebar_position: 2
---

# Query delivery order

Upon creating your order ([here](/docs/X-API-STORE_KEY/delivery-simple-apikey#example-delivery-order-request)) you can query the order whenever so required.
This is particularly useful when needing to lookup orders upon receiving a webhook request, and/or to check for status updates of the order on demand.

- You will require the `id` property of the order to query an individual order.
- `GET /api/Orders/{id}` -> **200** OK (order with delivery line items)

## Example Delivery Order query request

```js
request
    .get(`https://api-lokl.peddler.com/api/Orders/getDeliveryOrder/${id}`) // endpoint with order id
    .set('X-API-STORE-KEY', 'UNQIUE_TOKEN_FOR_STORE') // header
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        console.log(res.body); // order object
    });
```
