---
sidebar_position: 4
---

# Query manifest

Upon creating a manifest [here](/carrier-docs/Quickstart%20Guide/create-manifest),
you can query the entire manifest or particuler shipment(s) to get the status of the same. There are two ways to
query the manifest:
- JSON.stringify - This is the RECOMMENDED method of querying the manifest.
- Array - This is the alternate method of querying the manifest.

## Query request

In either of the ways, the query is made using the `GET` method. The query is made
to the following endpoint:

`/api/carrier/[CARRIER_ID]/getShipmentStatuses/?trackingNumbers`

### Querying the manifest using JSON.stringify

The JSON.stringify method is the recommended method of querying the manifest.
This method is used to query the manifest in a more readable format.

```js
const shipments = JSON.stringify([
    "PDXXXXXXXXX1",
    "PDXXXXXXXXX2",
    "PDXXXXBADXX3"
])

const query = `${PEDDLER_API_DOMAIN}/api/carrier/${CARRIER_ID}/getShipmentStatuses/?trackingNumbers=${shipments}`
```

### Querying the manifest using Array

The Array method is the alternate method of querying the manifest. This method
is used to query the manifest in a more compact format.

```js
const query = `${PEDDLER_API_DOMAIN}/api/carrier/${CARRIER_ID}/getShipmentStatuses/
?trackingNumbers[0]=PDXXXXXXXXX1&trackingNumbers[1]=PDXXXXXXXXX2&trackingNumbers[2]=PDXXXXBADXX3`
```

:::caution Limit of tracking numbers

The maximum number of tracking numbers that can be queried at once is **100**.

:::


## Query response

```json
{
  "data": [
    {
      "inquiryNumber": "PDXXXXXXXXX1",
      "consignee": {
        "address": {
            "name": "PDC 01 AMS",
            "address1": "John M. Keynesplein",
            "city": "Amsterdam",
            "postCode": "1066 EP",
            "country": "NL",
            "location": {
              "lat": "52.1031255",
              "lng": "5.0814312"
            },
            "phone": "+31 012345678"
          },
          "deliveryEmail": "devops@peddler.com"
        },
        "package": {
            "trackingNumber": "PDXXXXXXXXX1",
            "deliveryDate": "2023-07-10T15:43:24.133Z",
            "canceledDate": "2023-07-10T15:43:24.133Z",
            "returnToSenderDate": "2023-07-10T15:43:24.133Z",
            "events": [
                {
                    "status": "SHIPMENT_CONFIRMED",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "details": {
                        "description": {
                            "en": "Shipment confirmed by sender"
                        }
                        "estimatedDeliveryDate": "2023-07-10T15:43:24.133Z"
                    }
                },
                {
                    "status": "SHIPMENT_IN_WAREHOUSE",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "gps": {
                      "lat": "52.1031255",
                      "lng": "5.0814312"
                    },
                    "details": {
                        "description": {
                            "en": "Package confirmed in warehouse Amsterdam"
                        }
                        "estimatedDeliveryDate": "2023-07-10T15:43:24.133Z",
                        "warehouse": {
                            "address": {
                                "name": "PDC 01 AMS",
                                "address1": "John M. Keynesplein",
                                "city": "Amsterdam",
                                "postCode": "1066 EP",
                                "country": "NL",
                                "location": {
                                  "lat": "52.1031255",
                                  "lng": "5.0814312"
                                },
                                "phone": "+31 012345678"
                            }
                        }
                    }
                },
                {
                    "status": "OUT_FOR_DELIVERY",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "gps": {
                      "lat": "52.1031255",
                      "lng": "5.0814312"
                    },
                    "details": {
                      "description": {
                          "en": "Package out for delivery at XX:XX dd/mm/yyyy local time"
                      },
                      "courierName": "jay", // OPT
                      "estimatedDeliveryDate": "2023-07-10T15:43:24.133Z"
                    }
                },
                {
                    "status": "DELIVERED",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "gps": {
                      "lat": "52.1031255",
                      "lng": "5.0814312"
                    },
                    "details": {
                      "description": {
                          "en": "Package delivered at XX:XX dd/mm/yyyy local time"
                      },
                      "deliveryDate": "2023-07-10T15:43:24.133Z",

                      "courierName": "jay", // OPT
                      "courierComment": "FRONT_DOOR", // OPT
                      "deliveredAtNeighbours": "46 John M. Keynesplein", // OPT
                      "podSignatureUrl": "https://cdb.peddler.com/podsig/XXXXXXXXXX.png", // OPT
                    }
                },
                {
                    "status": "DELIVERED_COLLECTION_POINT",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "gps": {
                      "lat": "52.1031255",
                      "lng": "5.0814312"
                    },
                    "details": {
                      "description": {
                          "en": "Package delivered on XX:XX dd/mm/yyyy at collection point: Superstore John M. Keynesplein 12 1066EP"
                      },
                      "collectionPoint": {
                          "address": {
                              "name": "COLLECT 01 AMS",
                              "address1": "John M. Keynesplein",
                              "city": "Amsterdam",
                              "postCode": "1066 EP",
                              "country": "NL",
                              "location": {
                                "lat": "52.1031255",
                                "lng": "5.0814312"
                              }
                          }
                      },
                      "courierName": "jay", // OPT
                      "courierComment": "Scanned by collectionpoint", // OPT
                    }
                },
                {
                    "status": "FAILED_ATTEMPT",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "gps": {
                      "lat": "52.1031255",
                      "lng": "5.0814312"
                    },
                    "details": {
                      "reason": "Customer not answering, Wrong/incomplete address, Issue with package, Issue with transport/courier, Refused by customer",
                      "nextAttemptDate": "2023-07-10T15:43:24.133Z", // OPT
                      "contactSupport": true, // OPT
                      "description": {
                          "en": "Delivery attempt failed on XX:XX dd/mm/yyyy reason: Customer not answering/not in. Next attempt: XX:XX dd/mm/yyyy | Contact support | Routing to collection point"
                      }
                    }
                },
                {
                    "status": "ON_HOLD",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "details": {
                      "description": {
                          "en": "Shipment is currently on hold and waiting to be released or paused by support"
                      }
                    }
                },
                {
                    "status": "EXCEPTION",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "details": {
                      "description": {
                          "reason": "An issue described by the support team",
                          "en": "Shipment is currently being processed by support, anticipated status update in 48 hours."
                      }
                    }
                },
                {
                    "status": "RETURN_TO_SENDER",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "details": {
                      "description": {
                          "en": "Shipment has been returned to sender"
                      }
                    }
                },
                {
                    "status": "CANCELED",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "details": {
                      "description": {
                          "en": "Shipment has been canceled by sender/carrier"
                      }
                    }
                },
                {
                    "status": "SHIPMENT_DETAILS_UPDATED",
                    "ts": "2023-07-10T15:43:24.133Z",
                    "details": {
                      "description": {
                          "en": "The shipment details have been updated by: sender|support|consignee"
                          "originalShipment": {
                              ...shipment
                          },
                          "updatedByType": "CONSIGNEE",
                          "updatedByName": "Jon doe",
                          "updated": {
                              "deliveryDate": "2023-07-10T15:43:24.133Z",
                              "collectionPoint": {
                                  "address": {
                                      "name": "COLLECT 01 AMS",
                                      "address1": "John M. Keynesplein",
                                      "city": "Amsterdam",
                                      "postCode": "1066 EP",
                                      "country": "NL",
                                      "location": {
                                        "lat": "52.1031255",
                                        "lng": "5.0814312"
                                      }
                                  }
                              }
                          }
                      }
                    }
                }
            ]

        }

    }
  ]
}
```

:::tip Description of statuses

The detailed exaplanation of the statuses can be found in the table in the next page.

:::