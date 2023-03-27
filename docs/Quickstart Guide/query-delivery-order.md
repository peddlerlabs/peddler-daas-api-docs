---
sidebar_position: 5
---

# Query delivery order

Upon creating your order ([here](/docs/Quickstart%20Guide/create-order-instance)) you can query the order whenever so required.
This is particularly useful when needing to lookup orders upon receiving a webhook request, and/or to check for status updates of the order on demand.

- You will require the `id` property of the order to query an individual order.
- `GET /api/Orders/{id}` -> 200 OK (order with delivery line items)


```js title="Query order"
request
    .get(`https://api-lokl.peddler.com/api/Orders/${id}`) // endpoint with order id
    .set('Authorization', `Bearer ${access_token}`) // header
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        console.log(res.body); // order object
    });
```
