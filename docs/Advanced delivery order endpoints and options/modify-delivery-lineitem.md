---
sidebar_position: 5
---

# Modify delivery lineItem

You may wish to modify a delivery line item. You can do so by utilising the `order` "id" and the `deliveryLineItem` "id" from the order Instance created earlier.
- You will call the `PUT https://api-lokl.peddler.com/api/Orders/{id}/deliverylineItems/{fk}` endpoint where the `id` parameter is the id of the order, and the `fk` parameter is the id of the deliveryLineItem
- The response object will either be HTTP status 200 OK with the updated deliveryLineItem object returned OR a HTTP status 422 with relevant validation errors.
- You can only add/modify delivery line items if an order has not to yet been 'finalised' i.e. /api/Orders/{id}/completeOrder has not been called

## Example `/deliverylineItems` request

```js
request
    .put(`https://api-lokl.peddler.com/api/Orders/{id}/deliverylineItems/{fk}`) // endpoint
    .set('Authorization', `Bearer ${access_token}`) // header
    .send({
        quantity: 3
    })
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        const deliverLineItem = res.body; // deliverLineItem instance!
        console.log(deliverLineItem);
    });
```

## Example `/deliverylineItems` response

```json
{
    "id": "4ULvsZOH8W",
    "deliveryShippingType": "LETTERBOX",
    "deliveryContentsType": "GOODS",
    "description": "another_packing_slip_id",
    "quantity": 1,
    "unitPrice": 4.25,
    "totalAmount": 4.25,
    "taxAmount": 0.74,
    "taxRate": 0.21,
    "status": "ADDED",
    "scheduledPickupStart": "2021-07-12T12:00:00.000Z",
    "scheduledPickupEnd": "2021-07-12T14:00:00.000Z",
    "scheduledDeliveryStart": "2021-07-12T14:00:00.000Z",
    "scheduledDeliveryEnd": "2021-07-12T16:00:00.000Z",
    "deliveryStatus": "CREATED",
    "storeId": "J1GnoLQOcA",
    "pickupAddress": {
        ...
    },
    "deliveryAddress": {
        ...
    },
    "createdOn": "2021-07-12T10:13:33.895Z",
    "updatedOn": "2021-07-12T10:13:34.875Z"
}
```