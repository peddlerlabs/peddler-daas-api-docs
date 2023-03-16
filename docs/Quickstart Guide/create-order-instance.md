---
sidebar_position: 3
---

# Create an order instance

The order resource (referred to as an 'instance') is a container for a set of pickup-delivery instructions and their respective attributes. 
Each order instance contains one or more pickup-delivery line items, referred to as 'delivery line items'.

In this example we will start with a basic 'order instance' and a single 'delivery line item', more complex delivery options are provided in subsequent examples.

Peddler differentiates two types of order, distinguished by the `orderType` property:
- `DELIVERY_ORDER` : Booking a custom delivery on our platform (relevant to this documentation)
- `PRODUCT_ORDER` : Ordering a product on our platform (default)

Each 'Order Instance' can have many `deliveryLineItems` ([array] property) which contain instructions for each pickup/delivery pair to take place.

- At least one or more deliveryLineItems (denoting the delivery details addresses/type/times)
- Each delivery line item must specify:
    - `deliveryContentsType`: (enum 'string') FOOD, ALCOHOL, GOODS, BOOKS
    - `deliveryShippingType`: (enum 'string') PACKAGE, LETTERBOX, CUSTOM (the latter should always be used when a pre-agreed rate is desired)
    - `storeId`: ('string') required when shipping from a specific store
      - The SAME storeId must be used when defining multiple line items at once
    - `preferredDeliveryDate` OR `custom delivery slots`: ('string' YYYY-MM-DD) this allows you to select a preferred delivery data else it will default to the most immediate next available slot
    - `deliveryAddress`: ('object' Address) required address to be delivered to

:::tip Note on quantity 

This refers to the shipping quantity defined by physical package constraint:
- `quantity`: ('integer') denotes the number of packages being delivered within our package constraints i.e. < h: 75cm w: 50cm d: 50cm AND < 20KG, 
- If the items in total exceed the constraints, you will have to increase the quantity for each collection of items that exceed this constraint in order to avoid refusal of pickup.
    
> For example, if you are shipping 25 x 1kg wine bottles to a single address, you will have to apply quantity 2.

This is not strictly enforced however it should be applied if packaging weights are known.

:::

## Mock delivery order request

```js
const mockedDeliveryOrder = {
    "orderType": "DELIVERY_ORDER", // required order type
    // array of line items to be delivered
    "deliveryLineItems": [
        {
            // required 20000 characters or less
            // NOTE: on description: its important that couriers can quickly identify the package through a packing slip number
            "description": "packing_slip_number",
            // optional (defaults to GOODS)
            "deliveryContentsType": "ALCOHOL", 
            // optional (defaults to PACKAGE)
            // NOTE: CUSTOM provides pre-agreed rate
            "deliveryShippingType": "CUSTOM", 
            // YYYY-MM-DD optional (defaults to next available slot/time)
            "preferredDeliveryDate": "2021-07-11",
            // required (the id of the store for which you want to book a delivery)
            "storeId": "wOwJ1yBjvh",
            "quantity": 1, // optional defaults to 1
            // required (address object)
            "deliveryAddress": {
                // optional lat lng GeoPoint object if known
                "location": {
                    "lat": 52.340799,
                    "lng": 4.826336
                },
                "firstName": "recipient", // optional
                "lastName": "Peddler BV", // required last name
                "house": "12", // required house number
                "appartment": "2 hoog",  // optional appartment
                "address1": "John M. Keynesplein", // required street name
                "address2": "B-toren, L.0.K.4", // optional string
                "city": "Amsterdam", // required
                "state": "Noord Holland", // optional
                "postCode": "1066 EP", // required
                "country": "NL", // required ISO 3166-1 alpha-2 country code
                // optional customer mobile in E.164 format for SMS delivery notifications
                "phone": "+31 623754473" // optional
            },
            // customer email for notifications
            "deliveryEmail": "developers@peddler.com", // optional 
            // optional to keep a reference to your local order
            "metaData: "your_reference_id" // optional
        }
    ],
    // (recommended) optional custom webhook URI to receive status updates from the order
    "webhookUri": "https://peddl.free.beeceptor.com"
}

request
    .post('https://api-lokl.peddler.com/api/Orders')
    .set('Authorization', `Bearer ${access_token}`)
    .send(mockedDeliveryOrder)
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        const deliveryOrderInstance = res.body;
        console.log(deliveryOrderInstance);
    });
```

## Mock delivery order response

- Any validation errors would result in a **422** HTTP status code response, and validation errors in the response
- The most common validation error is utilising a postcode not in our catchment area (we will provide a postcode validation example below)


```json
{
    "id": "P06VS-53Dl",
    "orderNumber": "1341902575",
    "orderType": "DELIVERY_ORDER",
    "gl": "NL",
    "hl": "nl",
    "totalAmount": 6,
    "totalTaxAmount": 1.04,
    "orderAmount": 6,
    "orderTaxAmount": 1.04,
    "currency": "EUR",
    "status": "CREATED", // status of the order
    "webhookUri": "https://peddl.free.beeceptor.com",
    "ownerId": "Tf8GruUnyK",
    "billingAddress": {
        "id": "8PPPGkcCH8",
        "location": {
            "lat": 52.340799,
            "lng": 4.826336
        },
        "firstName": "Peddler",
        "lastName": "Peddler BV",
        "house": "12-46",
        "address1": "John M. Keynesplein",
        "address2": "B-toren, L.0.K.4",
        "city": "Amsterdam",
        "state": "Noord Holland",
        "postCode": "1066 EP",
        "country": "NL",
        "phone": "+31623754473"
    },
    "storeIds": [
        "LSfSX5SiLsJ"
    ],
    "createdOn": "2021-07-10T15:43:24.133Z",
    "updatedOn": "2021-07-10T15:43:24.304Z",
    "deliveryLineItems": [
        {
            "id": "VtBwUJhR9z",
            "deliveryShippingType": "CUSTOM",
            "deliveryContentsType": "ALCOHOL",
            "description": "packing_slip_number",
            "quantity": 1,
            "unitPrice": 6,
            "totalAmount": 6,
            "taxAmount": 1.04,
            "taxRate": 0.21,
            "status": "ADDED", // status of the pickup & delivery
            "scheduledPickupStart": "2021-07-11T12:00:00.000Z",
            "scheduledPickupEnd": "2021-07-11T14:00:00.000Z",
            "scheduledDeliveryStart": "2021-07-11T14:00:00.000Z",
            "scheduledDeliveryEnd": "2021-07-11T16:00:00.000Z",
            "deliveryStatus": "CREATED",
            "deliveryEmail": "developers@peddler.com",
            "metaData": "your_reference_id",
            "storeId": "LSfSX5SiLsJ",
            "pickupAddress": {
                "id": "8PPPGkcCH8",
                "location": {
                    "lat": 52.340799,
                    "lng": 4.826336
                },
                "firstName": "Peddler",
                "lastName": "Peddler BV",
                "house": "12-46",
                "address1": "John M. Keynesplein",
                "address2": "B-toren, L.0.K.4",
                "city": "Amsterdam",
                "state": "Noord Holland",
                "postCode": "1066 EP",
                "country": "NL",
                "phone": "+31623754473"
            },
            "deliveryAddress": {
                "id": "JYS4vreb9",
                "location": {
                    "lat": 52.340799,
                    "lng": 4.826336
                },
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
            },
            "createdOn": "2021-07-10T15:43:24.133Z",
            "updatedOn": "2021-07-10T15:43:24.227Z"
        }
    ]
}
```