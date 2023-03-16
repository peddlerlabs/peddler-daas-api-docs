---
sidebar_position: 6
---

# Cancel order

You may wish to cancel an order OR individual order line items. You can do so by utilising the order "id" from the order Instance created earlier and/or the respective line item id's if you wish to cancel these indidivually.
- Orders and delivery items can be canceled if they have the order instance has the status `CREATED`, `PAID`, `ACCEPTED`
- Any orders outside of this status can be cancelled by our customer services team [helpdesk@peddler.com](mailto:helpdesk@peddler.com)
- You cancel an order through a POST request to `https://api-lokl.peddler.com/api/Orders/{id}/cancelOrder` where the `id` parameter corresponds to the order instance.
- Should you omit the `lineItemIds` parameter in the body, all line items of the order are canceled.
- Every line item CANCELED will get the status "CANCELED"
- The endpoint responds with an 200 OK order instance
- If the order is already being shipped or the status has changed the endpoint will return a 400 error


## Example `/cancelOrder` request

```js
const mockCancelation = {
    lineItemIds: [
        "LSfSX5SiLsJ"
    ]
};
request
    .post(`https://api-lokl.peddler.com/api/Orders/{id}/cancelOrder`) // endpoint
    .set('Authorization', `Bearer ${access_token}`) // header
    .send(mockCancelation)
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        const orderInstance = res.body; // deliverLineItem instance!
        console.log(orderInstance);
    });

```

## Example `/cancelOrder` response

```json

{
    "id": "P06VS-53Dl",
    "orderNumber": "1341902575",
    "orderType": "DELIVERY_ORDER",
    "deliveryLineItems: [
        {
            "id": "LSfSX5SiLsJ",
            "status": "CANCELED",
            ...
        },
        {
            ...
        }
    ]
    ...
}
```
