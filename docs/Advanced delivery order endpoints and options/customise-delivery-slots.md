---
sidebar_position: 3
---

# Customise delivery slots

In order to customise delivery datetime by selecting available slots you can use our `GET /api/Orders/getDeliveryServiceSlots` endpoint.
This endpoint will provide a list of dynamic available delivery slots for the next 14 days in ASC order with available delivery and respective "pickup slots".
- A delivery slot is a time period donated as start/end UTC ISO-8601 JSON timestamps between which the item is delivery to the customer
- The `pickupSlots` property is a child array of the available delivery slots (mutually dependent) and donates the time between which the item is collected/picked-up from the store.
- `deliverySlot` times and `pickupSlots` times are always assigned as pairs and validated as such, you cannot randomly select different periods.

:::tip Recommendation

We always recommend to programatically select the last available pickup-slot closest to the delivery.

:::

**For example when querying the endpoint a list is returned in the following format:**

```json
[
    {
        "day": "Monday",
        "date": "2021-07-05",
        "deliverySlots": [
            {
                "between": {
                    "start": "16:00",
                    "end": "18:00"
                },
                "betweenUTC": {
                    "start": "2021-07-12T12:00:00.000Z", // scheduledDeliveryStart
                    "end": "2021-07-12T14:00:00.000Z" // scheduledDeliveryEnd
                },
                "pickupSlots": [
                    {
                        "between": {
                            "start": "12:00",
                            "end": "14:00"
                        },
                        "betweenUTC": {
                            "start": "2021-07-12T08:00:00.000Z",
                            "end": "2021-07-12T10:00:00.000Z"
                        }
                    },
                    {
                        "between": {
                            "start": "14:00",
                            "end": "16:00"
                        },
                        "betweenUTC": {
                            "start": "2021-07-12T10:00:00.000Z", // scheduledPickupStart
                            "end": "2021-07-12T12:00:00.000Z" // scheduledPickupEnd
                        }
                    }
                ]
            },
            {
                ...
            }
        ]
    }
]
```

## Querying the endpoint
 
:::tip Note

This is a GET request. So you will have to URL encode and JSON stringify the URL parameters.

:::

```json
request
    .get('/api/Orders/getDeliveryServiceSlots')
    .set('Authorization', `Bearer ${access_token}`)
    .query({
        "storeId": "JYS4vreb9",
        "deliveryAddress": {
            "firstName": "recipient",
            "lastName": "Peddler BV",
            "house": "12-46",
            "address1": "John M. Keynesplein",
            "address2": "B-toren, L.0.K.4",
            "city": "Amsterdam",
            "state": "Noord Holland",
            "postCode": "1066 EP",
            "country": "NL",
            "phone": "+31623754473"
        }
    })
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        console.log(res);
    });
    
// response 200 OK LIST OF [DELIVERY DATES][DELIVERY SLOTS][PICKUP SLOTS] available
```

### Utilising the `deliverySlots` times and `pickupSlots` times when creating OR updating an order:

```js
const mockedDeliveryOrder = {
    "orderType": "DELIVERY_ORDER", // required order type
    "deliveryLineItems": [ // array of line items to be delivered
        {
            // NOTE on description: its important that courier can quickly identify the package through a packing slip number
            "description": "packing_slip_number", // required 20000 characters or less
            "deliveryContentsType": "ALCOHOL", // optional (defaults to GOODS)
            // CUSTOM provides pre-agreed rate
            "deliveryShippingType": "CUSTOM",// optional (defaults to PACKAGE)
            // example path slots[0].deliverySlots[0].betweenUTC.start
            "scheduledDeliveryStart": "2021-07-12T12:00:00.000Z", 
            // example path slots[0].deliverySlots[0].betweenUTC.end
            "scheduledDeliveryEnd": "2021-07-12T10:00:00.000Z",
            // slots[0].deliverySlots[0].pickupSlots[1].betweenUTC.start
            "scheduledPickupStart": "2021-07-12T10:00:00.000Z", 
            // slots[0].deliverySlots[0].pickupSlots[1].betweenUTC.end
            "scheduledPickupEnd": "2021-07-12T12:00:00.000Z",
            // required the ID of the store you want to book the delivery for
            "storeId": "wOwJ1yBjvh", // required
            "deliveryAddress": { // required
                ...
            },
            "deliveryEmail": "developers@peddler.com", // optional customer email for notifications
            "metaData: "your_reference_id" // optional to keep a reference to your local order
        }
    ],
    "webhookUri": "https://peddl.free.beeceptor.com" // (recommended) optional custom webhook URI to receive status updates from the order
}

request
    .post('https://api-lokl.peddler.com/api/Orders') // endpoint
    .set('Authorization', `Bearer ${access_token}`) // header
    .send(mockedDeliveryOrder)
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        const deliveryOrderInstance = res.body; // delivery order instance!
        console.log(deliveryOrderInstance);
    });
```
