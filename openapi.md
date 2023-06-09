# Peddler Delivery as a Service API

> Version 1.0.0

The Peddler Delivery as a Service API is a RESTful API that allows you to create, read, update and delete orders. The API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| POST | [/api/Orders](#postapiorders) | Create new instance of the model |
| GET | [/api/Orders](#getapiorders) | Find all instances of the model matched by filter |
| GET | [/api/Orders/{id}](#getapiordersid) | Find a model instance by {id} from the data source. |
| PUT | [/api/Orders/{id}](#putapiordersid) | Replace attributes for a model instance |
| GET | [/api/Orders/{id}/billingaddress](#getapiordersidbillingaddress) | Fetch hasOne relation billingaddress |
| POST | [/api/Orders/{id}/billingaddress](#postapiordersidbillingaddress) | Create new instance in billingaddress |
| PUT | [/api/Orders/{id}/billingaddress](#putapiordersidbillingaddress) | Update billingaddress |
| GET | [/api/Orders/{id}/deliverylineItems/{fk}](#getapiordersiddeliverylineitemsfk) | Find a related item by id for deliverylineItems |
| DELETE | [/api/Orders/{id}/deliverylineItems/{fk}](#deleteapiordersiddeliverylineitemsfk) | Delete a related item by id for deliverylineItems |
| PUT | [/api/Orders/{id}/deliverylineItems/{fk}](#putapiordersiddeliverylineitemsfk) | Update a related item by id for deliverylineItems |
| GET | [/api/Orders/{id}/deliverylineItems](#getapiordersiddeliverylineitems) | Query deliverylineItems of Order |
| POST | [/api/Orders/{id}/deliverylineItems](#postapiordersiddeliverylineitems) | Create a new instance in deliverylineItems of this model |
| DELETE | [/api/Orders/{id}/deliverylineItems](#deleteapiordersiddeliverylineitems) | Delete all deliverylineItems of model |
| POST | [/api/Orders/{id}/completeOrder](#postapiordersidcompleteorder) | Complete an order |
| GET | [/api/Orders/getDeliveryServiceTypes](#getapiordersgetdeliveryservicetypes) | Get custom delivery types |
| GET | [/api/Orders/getDeliveryServiceSlots?{pickupAddress}&{deliveryAddress}&{storeId}](#getapiordersgetdeliveryserviceslotspickupaddressdeliveryaddressstoreid) | Get the available delivery slots Date Object and time slot per date |
| POST | [/api/Orders/{id}/status/cancelOrder](#postapiordersidstatuscancelorder) | Cancel order |
| GET | [/api/Orders/{id}/getPackingSlip](#getapiordersidgetpackingslip) | Get the packing slip for the order |
| POST | [/api/Orders/uploadDeliveryCSV](#postapiordersuploaddeliverycsv) | Upload a CSV feed |
| GET | [/api/PostcodeRegions](#getapipostcoderegions) | Retrieve all postcodes and regions |
| GET | [/api/PostcodeRegions/{postcode}](#getapipostcoderegionspostcode) | Retrieve single postcode and region |
| GET | [/api/PostcodeRegions/validatePostcode](#getapipostcoderegionsvalidatepostcode) | Validate postcode |
| GET | [/api/Peddlers/{id}/stores](#getapipeddlersidstores) | Query stores of Peddler |
| POST | [/api/Peddlers/validateAddress](#postapipeddlersvalidateaddress) | Validate address for specific catchment area |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| BearerAuth | [#/components/securitySchemes/BearerAuth](#componentssecurityschemesbearerauth) |  |
| Create_a_new_instance_of_the_model_and_persist_it_into_the_data_source.Body | [#/components/requestBodies/Create_a_new_instance_of_the_model_and_persist_it_into_the_data_source.Body](#componentsrequestbodiescreate_a_new_instance_of_the_model_and_persist_it_into_the_data_sourcebody) |  |
| Update_a_related_item_by_id_for_deliverylineItems.Body | [#/components/requestBodies/Update_a_related_item_by_id_for_deliverylineItems.Body](#componentsrequestbodiesupdate_a_related_item_by_id_for_deliverylineitemsbody) |  |
| Get_the_packing_slip_for_the_orderXordernumber | [#/components/requestBodies/Get_the_packing_slip_for_the_orderXordernumber](#componentsrequestbodiesget_the_packing_slip_for_the_orderxordernumber) |  |

## Path Details

***

### [POST]/api/Orders

- Summary  
Create new instance of the model

- Security  
BearerAuth  

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "description": "Model instance data",
  "properties": {
    "id": {
      "description": "Auto-assigned: Short Id is automatically generated",
      "type": "string"
    },
    "orderNumber": {
      "description": "Auto-assigned: Order Number is automatically generated",
      "type": "string"
    },
    "orderType": {
      "default": "PRODUCT_ORDER",
      "enum": [
        "PRODUCT_ORDER",
        "DELIVERY_ORDER"
      ],
      "type": "string"
    },
    "gl": {
      "default": "NL",
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "hl": {
      "enum": [
        "en",
        "nl"
      ],
      "type": "string"
    },
    "totalAmount": {
      "description": "Auto-assigned: Total: shippingAmount + orderAmount",
      "type": "number",
      "format": "double"
    },
    "totalTaxAmount": {
      "description": "Auto-assigned: Tax: shippingTaxAmount + orderTaxAmount",
      "type": "number",
      "format": "double"
    },
    "orderAmount": {
      "description": "Auto-assigned: Total order amount inc. taxes - must add up to each line item (totalAmount)",
      "type": "number",
      "format": "double"
    },
    "orderTaxAmount": {
      "description": "Auto-assigned: Total lineitem taxes - must add up to each line item (taxAmount)",
      "type": "number",
      "format": "double"
    },
    "shippingAmount": {
      "description": "Auto-assigned: Total shipping cost inc. taxes",
      "type": "number",
      "format": "double"
    },
    "shippingTaxAmount": {
      "description": "Auto-assigned: Shipping tax: shippingAmount ├ù (shippingTaxRate / (1 + shippingTaxRate))",
      "type": "number",
      "format": "double"
    },
    "shippingTaxRate": {
      "default": 0.21,
      "description": "Auto-assigned: Tax amount in decimal point 21% = 0.21",
      "type": "number",
      "format": "double"
    },
    "discountAmount": {
      "description": "Auto: Discount for this order inc. taxes (based on voucher)",
      "type": "number",
      "format": "double"
    },
    "commission": {
      "description": "Auto-assigned: Total commission for order inc. taxes - must add up to each line item (commission)",
      "type": "number",
      "format": "double"
    },
    "currency": {
      "default": "EUR",
      "description": "Auto-assigned: based on shipping address country",
      "type": "string"
    },
    "rating": {
      "description": "Auto-assigned/restricted",
      "type": "number",
      "format": "double"
    },
    "comment": {
      "type": "string"
    },
    "refundTotal": {
      "description": "Auto-assigned: refunded",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "description": "Auto-assigned",
      "type": "string"
    },
    "refundReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "canceledReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "returnedReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "status": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "PROCESSING_PAYMENT",
        "PAYMENT_FAILED",
        "PAID",
        "PARTIALLY_ACCEPTED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "PROCESSING_REFUND",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "PARTIALLY_RETURNED",
        "RETURNED"
      ],
      "description": "Auto-assigned: The STATUS is automatically assigned",
      "type": "string"
    },
    "pspOrderId": {
      "description": "Auto-assigned: pspOrderLineId is automatically assigned",
      "type": "string"
    },
    "pspOrderStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspPaidAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pspRefundStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspRefundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "redirectPaymentUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "webhookUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "cancelReview": {
      "description": "Cancel review",
      "type": "boolean"
    },
    "ageCheck": {
      "description": "Automatically assigned",
      "type": "number",
      "format": "double"
    },
    "ownerId": {
      "type": "string"
    },
    "paymentOnAccountId": {
      "type": "string"
    },
    "billingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "shippingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "storeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    },
    "orderLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productSlug": {
            "type": "string"
          },
          "productImageFileName": {
            "type": "string"
          },
          "productVariantTitle": {
            "type": "string"
          },
          "productVariantSlug": {
            "type": "string"
          },
          "productVariantImageFileName": {
            "type": "string"
          },
          "productSubTitle": {
            "type": "string"
          },
          "productRetailId": {
            "type": "string"
          },
          "productSku": {
            "type": "string"
          },
          "productVariantSubTitle": {
            "type": "string"
          },
          "productVariantRetailId": {
            "type": "string"
          },
          "productVariantSku": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "productId": {
            "type": "string"
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "productTitle",
          "productSlug",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status"
        ],
        "additionalProperties": false
      }
    },
    "deliveryLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "deliveryShippingType": {
            "default": "PACKAGE",
            "enum": [
              "PACKAGE",
              "LETTERBOX",
              "CUSTOM"
            ],
            "description": "auto: deliveryShippingType TYPE is automatically assigned",
            "type": "string"
          },
          "deliveryContentsType": {
            "default": "GOODS",
            "enum": [
              "FOOD",
              "ALCOHOL",
              "GOODS",
              "BOOKS"
            ],
            "description": "auto: deliveryContentsType is automatically assigned",
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "scheduledPickupStart": {
            "description": "Add start from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledPickupEnd": {
            "description": "Add end from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryStart": {
            "description": "Add start from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryEnd": {
            "description": "Add end from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "deliveryStatus": {
            "default": "CREATED",
            "enum": [
              "CREATED",
              "BOOKING",
              "SCHEDULED",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "CANCELED",
              "RETURNED_TO_STORE"
            ],
            "description": "Auto-assign: The STATUS is automatically assigned",
            "type": "string"
          },
          "rider": {
            "type": "string"
          },
          "riderAssignedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "dispatchedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "pickedupAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "onRouteAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "deliveredAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "canceledAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "returnedToStoreAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "tookan_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliverySystem": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "pickupAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "deliveryAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "deliveryShippingType",
          "deliveryContentsType",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status",
          "scheduledPickupStart",
          "scheduledPickupEnd",
          "scheduledDeliveryStart",
          "scheduledDeliveryEnd",
          "deliveryStatus"
        ],
        "additionalProperties": false
      }
    },
    "voucherId": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "orderNumber",
    "orderType",
    "gl",
    "hl",
    "totalAmount",
    "totalTaxAmount",
    "orderAmount",
    "orderTaxAmount",
    "shippingAmount",
    "shippingTaxAmount",
    "shippingTaxRate",
    "currency",
    "status"
  ],
  "additionalProperties": false
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned: Short Id is automatically generated",
      "type": "string"
    },
    "orderNumber": {
      "description": "Auto-assigned: Order Number is automatically generated",
      "type": "string"
    },
    "orderType": {
      "default": "PRODUCT_ORDER",
      "enum": [
        "PRODUCT_ORDER",
        "DELIVERY_ORDER"
      ],
      "type": "string"
    },
    "gl": {
      "default": "NL",
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "hl": {
      "enum": [
        "en",
        "nl"
      ],
      "type": "string"
    },
    "totalAmount": {
      "description": "Auto-assigned: Total: shippingAmount + orderAmount",
      "type": "number",
      "format": "double"
    },
    "totalTaxAmount": {
      "description": "Auto-assigned: Tax: shippingTaxAmount + orderTaxAmount",
      "type": "number",
      "format": "double"
    },
    "orderAmount": {
      "description": "Auto-assigned: Total order amount inc. taxes - must add up to each line item (totalAmount)",
      "type": "number",
      "format": "double"
    },
    "orderTaxAmount": {
      "description": "Auto-assigned: Total lineitem taxes - must add up to each line item (taxAmount)",
      "type": "number",
      "format": "double"
    },
    "shippingAmount": {
      "description": "Auto-assigned: Total shipping cost inc. taxes",
      "type": "number",
      "format": "double"
    },
    "shippingTaxAmount": {
      "description": "Auto-assigned: Shipping tax: shippingAmount ├ù (shippingTaxRate / (1 + shippingTaxRate))",
      "type": "number",
      "format": "double"
    },
    "shippingTaxRate": {
      "default": 0.21,
      "description": "Auto-assigned: Tax amount in decimal point 21% = 0.21",
      "type": "number",
      "format": "double"
    },
    "discountAmount": {
      "description": "Auto: Discount for this order inc. taxes (based on voucher)",
      "type": "number",
      "format": "double"
    },
    "commission": {
      "description": "Auto-assigned: Total commission for order inc. taxes - must add up to each line item (commission)",
      "type": "number",
      "format": "double"
    },
    "currency": {
      "default": "EUR",
      "description": "Auto-assigned: based on shipping address country",
      "type": "string"
    },
    "rating": {
      "description": "Auto-assigned/restricted",
      "type": "number",
      "format": "double"
    },
    "comment": {
      "type": "string"
    },
    "refundTotal": {
      "description": "Auto-assigned: refunded",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "description": "Auto-assigned",
      "type": "string"
    },
    "refundReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "canceledReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "returnedReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "status": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "PROCESSING_PAYMENT",
        "PAYMENT_FAILED",
        "PAID",
        "PARTIALLY_ACCEPTED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "PROCESSING_REFUND",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "PARTIALLY_RETURNED",
        "RETURNED"
      ],
      "description": "Auto-assigned: The STATUS is automatically assigned",
      "type": "string"
    },
    "pspOrderId": {
      "description": "Auto-assigned: pspOrderLineId is automatically assigned",
      "type": "string"
    },
    "pspOrderStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspPaidAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pspRefundStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspRefundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "redirectPaymentUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "webhookUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "cancelReview": {
      "description": "Cancel review",
      "type": "boolean"
    },
    "ageCheck": {
      "description": "Automatically assigned",
      "type": "number",
      "format": "double"
    },
    "ownerId": {
      "type": "string"
    },
    "paymentOnAccountId": {
      "type": "string"
    },
    "billingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "shippingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "storeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    },
    "orderLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productSlug": {
            "type": "string"
          },
          "productImageFileName": {
            "type": "string"
          },
          "productVariantTitle": {
            "type": "string"
          },
          "productVariantSlug": {
            "type": "string"
          },
          "productVariantImageFileName": {
            "type": "string"
          },
          "productSubTitle": {
            "type": "string"
          },
          "productRetailId": {
            "type": "string"
          },
          "productSku": {
            "type": "string"
          },
          "productVariantSubTitle": {
            "type": "string"
          },
          "productVariantRetailId": {
            "type": "string"
          },
          "productVariantSku": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "productId": {
            "type": "string"
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "productTitle",
          "productSlug",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status"
        ],
        "additionalProperties": false
      }
    },
    "deliveryLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "deliveryShippingType": {
            "default": "PACKAGE",
            "enum": [
              "PACKAGE",
              "LETTERBOX",
              "CUSTOM"
            ],
            "description": "auto: deliveryShippingType TYPE is automatically assigned",
            "type": "string"
          },
          "deliveryContentsType": {
            "default": "GOODS",
            "enum": [
              "FOOD",
              "ALCOHOL",
              "GOODS",
              "BOOKS"
            ],
            "description": "auto: deliveryContentsType is automatically assigned",
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "scheduledPickupStart": {
            "description": "Add start from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledPickupEnd": {
            "description": "Add end from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryStart": {
            "description": "Add start from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryEnd": {
            "description": "Add end from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "deliveryStatus": {
            "default": "CREATED",
            "enum": [
              "CREATED",
              "BOOKING",
              "SCHEDULED",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "CANCELED",
              "RETURNED_TO_STORE"
            ],
            "description": "Auto-assign: The STATUS is automatically assigned",
            "type": "string"
          },
          "rider": {
            "type": "string"
          },
          "riderAssignedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "dispatchedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "pickedupAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "onRouteAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "deliveredAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "canceledAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "returnedToStoreAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "tookan_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliverySystem": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "pickupAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "deliveryAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "deliveryShippingType",
          "deliveryContentsType",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status",
          "scheduledPickupStart",
          "scheduledPickupEnd",
          "scheduledDeliveryStart",
          "scheduledDeliveryEnd",
          "deliveryStatus"
        ],
        "additionalProperties": false
      }
    },
    "voucherId": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "orderNumber",
    "orderType",
    "gl",
    "hl",
    "totalAmount",
    "totalTaxAmount",
    "orderAmount",
    "orderTaxAmount",
    "shippingAmount",
    "shippingTaxAmount",
    "shippingTaxRate",
    "currency",
    "status"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "do",
    "orderNumber": "incididunt co",
    "orderType": "PRODUCT_ORDER",
    "gl": "NL",
    "hl": "en",
    "totalAmount": -83795630,
    "totalTaxAmount": -22708422,
    "orderAmount": 39760702,
    "orderTaxAmount": 83904644,
    "shippingAmount": -83100523,
    "shippingTaxAmount": -60654781,
    "shippingTaxRate": 0.21,
    "currency": "EUR",
    "status": "RETURNED"
  }
}
```

***

### [GET]/api/Orders

- Summary  
Find all instances of the model matched by filter

#### Parameters(Query)

```ts
filter: string
```

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
[]
```

- Examples

  - response

```json
{
  "value": [
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
      "status": "CREATED",
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
          "status": "ADDED",
          "scheduledPickupStart": "2021-07-11T12:00:00.000Z",
          "scheduledPickupEnd": "2021-07-11T14:00:00.000Z",
          "scheduledDeliveryStart": "2021-07-11T14:00:00.000Z",
          "scheduledDeliveryEnd": "2021-07-11T16:00:00.000Z",
          "deliveryStatus": "CREATED",
          "deliveryEmail": "developers@peddler.com",
          "metaData": "your_reference_id",
          "storeId": "LSfSX5SiLsJ",
          "pickupTrackingUrl": "https://pdlr.it/abc",
          "deliveryTrackingUrl": "https://pdlr.it/xyz",
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
  ]
}
```

***

### [GET]/api/Orders/{id}

- Summary  
Find a model instance by {id} from the data source.

#### Parameters(Query)

```ts
filter: string
```

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`*/*`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned: Short Id is automatically generated",
      "type": "string"
    },
    "orderNumber": {
      "description": "Auto-assigned: Order Number is automatically generated",
      "type": "string"
    },
    "orderType": {
      "default": "PRODUCT_ORDER",
      "enum": [
        "PRODUCT_ORDER",
        "DELIVERY_ORDER"
      ],
      "type": "string"
    },
    "gl": {
      "default": "NL",
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "hl": {
      "enum": [
        "en",
        "nl"
      ],
      "type": "string"
    },
    "totalAmount": {
      "description": "Auto-assigned: Total: shippingAmount + orderAmount",
      "type": "number",
      "format": "double"
    },
    "totalTaxAmount": {
      "description": "Auto-assigned: Tax: shippingTaxAmount + orderTaxAmount",
      "type": "number",
      "format": "double"
    },
    "orderAmount": {
      "description": "Auto-assigned: Total order amount inc. taxes - must add up to each line item (totalAmount)",
      "type": "number",
      "format": "double"
    },
    "orderTaxAmount": {
      "description": "Auto-assigned: Total lineitem taxes - must add up to each line item (taxAmount)",
      "type": "number",
      "format": "double"
    },
    "shippingAmount": {
      "description": "Auto-assigned: Total shipping cost inc. taxes",
      "type": "number",
      "format": "double"
    },
    "shippingTaxAmount": {
      "description": "Auto-assigned: Shipping tax: shippingAmount ├ù (shippingTaxRate / (1 + shippingTaxRate))",
      "type": "number",
      "format": "double"
    },
    "shippingTaxRate": {
      "default": 0.21,
      "description": "Auto-assigned: Tax amount in decimal point 21% = 0.21",
      "type": "number",
      "format": "double"
    },
    "discountAmount": {
      "description": "Auto: Discount for this order inc. taxes (based on voucher)",
      "type": "number",
      "format": "double"
    },
    "commission": {
      "description": "Auto-assigned: Total commission for order inc. taxes - must add up to each line item (commission)",
      "type": "number",
      "format": "double"
    },
    "currency": {
      "default": "EUR",
      "description": "Auto-assigned: based on shipping address country",
      "type": "string"
    },
    "rating": {
      "description": "Auto-assigned/restricted",
      "type": "number",
      "format": "double"
    },
    "comment": {
      "type": "string"
    },
    "refundTotal": {
      "description": "Auto-assigned: refunded",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "description": "Auto-assigned",
      "type": "string"
    },
    "refundReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "canceledReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "returnedReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "status": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "PROCESSING_PAYMENT",
        "PAYMENT_FAILED",
        "PAID",
        "PARTIALLY_ACCEPTED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "PROCESSING_REFUND",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "PARTIALLY_RETURNED",
        "RETURNED"
      ],
      "description": "Auto-assigned: The STATUS is automatically assigned",
      "type": "string"
    },
    "pspOrderId": {
      "description": "Auto-assigned: pspOrderLineId is automatically assigned",
      "type": "string"
    },
    "pspOrderStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspPaidAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pspRefundStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspRefundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "redirectPaymentUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "webhookUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "cancelReview": {
      "description": "Cancel review",
      "type": "boolean"
    },
    "ageCheck": {
      "description": "Automatically assigned",
      "type": "number",
      "format": "double"
    },
    "ownerId": {
      "type": "string"
    },
    "paymentOnAccountId": {
      "type": "string"
    },
    "billingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "shippingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "storeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    },
    "orderLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productSlug": {
            "type": "string"
          },
          "productImageFileName": {
            "type": "string"
          },
          "productVariantTitle": {
            "type": "string"
          },
          "productVariantSlug": {
            "type": "string"
          },
          "productVariantImageFileName": {
            "type": "string"
          },
          "productSubTitle": {
            "type": "string"
          },
          "productRetailId": {
            "type": "string"
          },
          "productSku": {
            "type": "string"
          },
          "productVariantSubTitle": {
            "type": "string"
          },
          "productVariantRetailId": {
            "type": "string"
          },
          "productVariantSku": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "productId": {
            "type": "string"
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "productTitle",
          "productSlug",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status"
        ],
        "additionalProperties": false
      }
    },
    "deliveryLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "deliveryShippingType": {
            "default": "PACKAGE",
            "enum": [
              "PACKAGE",
              "LETTERBOX",
              "CUSTOM"
            ],
            "description": "auto: deliveryShippingType TYPE is automatically assigned",
            "type": "string"
          },
          "deliveryContentsType": {
            "default": "GOODS",
            "enum": [
              "FOOD",
              "ALCOHOL",
              "GOODS",
              "BOOKS"
            ],
            "description": "auto: deliveryContentsType is automatically assigned",
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "scheduledPickupStart": {
            "description": "Add start from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledPickupEnd": {
            "description": "Add end from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryStart": {
            "description": "Add start from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryEnd": {
            "description": "Add end from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "deliveryStatus": {
            "default": "CREATED",
            "enum": [
              "CREATED",
              "BOOKING",
              "SCHEDULED",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "CANCELED",
              "RETURNED_TO_STORE"
            ],
            "description": "Auto-assign: The STATUS is automatically assigned",
            "type": "string"
          },
          "rider": {
            "type": "string"
          },
          "riderAssignedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "dispatchedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "pickedupAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "onRouteAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "deliveredAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "canceledAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "returnedToStoreAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "tookan_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliverySystem": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "pickupAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "deliveryAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "deliveryShippingType",
          "deliveryContentsType",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status",
          "scheduledPickupStart",
          "scheduledPickupEnd",
          "scheduledDeliveryStart",
          "scheduledDeliveryEnd",
          "deliveryStatus"
        ],
        "additionalProperties": false
      }
    },
    "voucherId": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "orderNumber",
    "orderType",
    "gl",
    "hl",
    "totalAmount",
    "totalTaxAmount",
    "orderAmount",
    "orderTaxAmount",
    "shippingAmount",
    "shippingTaxAmount",
    "shippingTaxRate",
    "currency",
    "status"
  ],
  "additionalProperties": false
}
```

***

### [PUT]/api/Orders/{id}

- Summary  
Replace attributes for a model instance

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "description": "Model instance data",
  "properties": {
    "id": {
      "description": "Auto-assigned: Short Id is automatically generated",
      "type": "string"
    },
    "orderNumber": {
      "description": "Auto-assigned: Order Number is automatically generated",
      "type": "string"
    },
    "orderType": {
      "default": "PRODUCT_ORDER",
      "enum": [
        "PRODUCT_ORDER",
        "DELIVERY_ORDER"
      ],
      "type": "string"
    },
    "gl": {
      "default": "NL",
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "hl": {
      "enum": [
        "en",
        "nl"
      ],
      "type": "string"
    },
    "totalAmount": {
      "description": "Auto-assigned: Total: shippingAmount + orderAmount",
      "type": "number",
      "format": "double"
    },
    "totalTaxAmount": {
      "description": "Auto-assigned: Tax: shippingTaxAmount + orderTaxAmount",
      "type": "number",
      "format": "double"
    },
    "orderAmount": {
      "description": "Auto-assigned: Total order amount inc. taxes - must add up to each line item (totalAmount)",
      "type": "number",
      "format": "double"
    },
    "orderTaxAmount": {
      "description": "Auto-assigned: Total lineitem taxes - must add up to each line item (taxAmount)",
      "type": "number",
      "format": "double"
    },
    "shippingAmount": {
      "description": "Auto-assigned: Total shipping cost inc. taxes",
      "type": "number",
      "format": "double"
    },
    "shippingTaxAmount": {
      "description": "Auto-assigned: Shipping tax: shippingAmount ├ù (shippingTaxRate / (1 + shippingTaxRate))",
      "type": "number",
      "format": "double"
    },
    "shippingTaxRate": {
      "default": 0.21,
      "description": "Auto-assigned: Tax amount in decimal point 21% = 0.21",
      "type": "number",
      "format": "double"
    },
    "discountAmount": {
      "description": "Auto: Discount for this order inc. taxes (based on voucher)",
      "type": "number",
      "format": "double"
    },
    "commission": {
      "description": "Auto-assigned: Total commission for order inc. taxes - must add up to each line item (commission)",
      "type": "number",
      "format": "double"
    },
    "currency": {
      "default": "EUR",
      "description": "Auto-assigned: based on shipping address country",
      "type": "string"
    },
    "rating": {
      "description": "Auto-assigned/restricted",
      "type": "number",
      "format": "double"
    },
    "comment": {
      "type": "string"
    },
    "refundTotal": {
      "description": "Auto-assigned: refunded",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "description": "Auto-assigned",
      "type": "string"
    },
    "refundReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "canceledReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "returnedReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "status": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "PROCESSING_PAYMENT",
        "PAYMENT_FAILED",
        "PAID",
        "PARTIALLY_ACCEPTED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "PROCESSING_REFUND",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "PARTIALLY_RETURNED",
        "RETURNED"
      ],
      "description": "Auto-assigned: The STATUS is automatically assigned",
      "type": "string"
    },
    "pspOrderId": {
      "description": "Auto-assigned: pspOrderLineId is automatically assigned",
      "type": "string"
    },
    "pspOrderStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspPaidAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pspRefundStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspRefundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "redirectPaymentUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "webhookUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "cancelReview": {
      "description": "Cancel review",
      "type": "boolean"
    },
    "ageCheck": {
      "description": "Automatically assigned",
      "type": "number",
      "format": "double"
    },
    "ownerId": {
      "type": "string"
    },
    "paymentOnAccountId": {
      "type": "string"
    },
    "billingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "shippingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "storeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    },
    "orderLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productSlug": {
            "type": "string"
          },
          "productImageFileName": {
            "type": "string"
          },
          "productVariantTitle": {
            "type": "string"
          },
          "productVariantSlug": {
            "type": "string"
          },
          "productVariantImageFileName": {
            "type": "string"
          },
          "productSubTitle": {
            "type": "string"
          },
          "productRetailId": {
            "type": "string"
          },
          "productSku": {
            "type": "string"
          },
          "productVariantSubTitle": {
            "type": "string"
          },
          "productVariantRetailId": {
            "type": "string"
          },
          "productVariantSku": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "productId": {
            "type": "string"
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "productTitle",
          "productSlug",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status"
        ],
        "additionalProperties": false
      }
    },
    "deliveryLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "deliveryShippingType": {
            "default": "PACKAGE",
            "enum": [
              "PACKAGE",
              "LETTERBOX",
              "CUSTOM"
            ],
            "description": "auto: deliveryShippingType TYPE is automatically assigned",
            "type": "string"
          },
          "deliveryContentsType": {
            "default": "GOODS",
            "enum": [
              "FOOD",
              "ALCOHOL",
              "GOODS",
              "BOOKS"
            ],
            "description": "auto: deliveryContentsType is automatically assigned",
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "scheduledPickupStart": {
            "description": "Add start from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledPickupEnd": {
            "description": "Add end from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryStart": {
            "description": "Add start from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryEnd": {
            "description": "Add end from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "deliveryStatus": {
            "default": "CREATED",
            "enum": [
              "CREATED",
              "BOOKING",
              "SCHEDULED",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "CANCELED",
              "RETURNED_TO_STORE"
            ],
            "description": "Auto-assign: The STATUS is automatically assigned",
            "type": "string"
          },
          "rider": {
            "type": "string"
          },
          "riderAssignedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "dispatchedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "pickedupAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "onRouteAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "deliveredAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "canceledAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "returnedToStoreAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "tookan_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliverySystem": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "pickupAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "deliveryAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "deliveryShippingType",
          "deliveryContentsType",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status",
          "scheduledPickupStart",
          "scheduledPickupEnd",
          "scheduledDeliveryStart",
          "scheduledDeliveryEnd",
          "deliveryStatus"
        ],
        "additionalProperties": false
      }
    },
    "voucherId": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "orderNumber",
    "orderType",
    "gl",
    "hl",
    "totalAmount",
    "totalTaxAmount",
    "orderAmount",
    "orderTaxAmount",
    "shippingAmount",
    "shippingTaxAmount",
    "shippingTaxRate",
    "currency",
    "status"
  ],
  "additionalProperties": false
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned: Short Id is automatically generated",
      "type": "string"
    },
    "orderNumber": {
      "description": "Auto-assigned: Order Number is automatically generated",
      "type": "string"
    },
    "orderType": {
      "default": "PRODUCT_ORDER",
      "enum": [
        "PRODUCT_ORDER",
        "DELIVERY_ORDER"
      ],
      "type": "string"
    },
    "gl": {
      "default": "NL",
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "hl": {
      "enum": [
        "en",
        "nl"
      ],
      "type": "string"
    },
    "totalAmount": {
      "description": "Auto-assigned: Total: shippingAmount + orderAmount",
      "type": "number",
      "format": "double"
    },
    "totalTaxAmount": {
      "description": "Auto-assigned: Tax: shippingTaxAmount + orderTaxAmount",
      "type": "number",
      "format": "double"
    },
    "orderAmount": {
      "description": "Auto-assigned: Total order amount inc. taxes - must add up to each line item (totalAmount)",
      "type": "number",
      "format": "double"
    },
    "orderTaxAmount": {
      "description": "Auto-assigned: Total lineitem taxes - must add up to each line item (taxAmount)",
      "type": "number",
      "format": "double"
    },
    "shippingAmount": {
      "description": "Auto-assigned: Total shipping cost inc. taxes",
      "type": "number",
      "format": "double"
    },
    "shippingTaxAmount": {
      "description": "Auto-assigned: Shipping tax: shippingAmount ├ù (shippingTaxRate / (1 + shippingTaxRate))",
      "type": "number",
      "format": "double"
    },
    "shippingTaxRate": {
      "default": 0.21,
      "description": "Auto-assigned: Tax amount in decimal point 21% = 0.21",
      "type": "number",
      "format": "double"
    },
    "discountAmount": {
      "description": "Auto: Discount for this order inc. taxes (based on voucher)",
      "type": "number",
      "format": "double"
    },
    "commission": {
      "description": "Auto-assigned: Total commission for order inc. taxes - must add up to each line item (commission)",
      "type": "number",
      "format": "double"
    },
    "currency": {
      "default": "EUR",
      "description": "Auto-assigned: based on shipping address country",
      "type": "string"
    },
    "rating": {
      "description": "Auto-assigned/restricted",
      "type": "number",
      "format": "double"
    },
    "comment": {
      "type": "string"
    },
    "refundTotal": {
      "description": "Auto-assigned: refunded",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "description": "Auto-assigned",
      "type": "string"
    },
    "refundReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "canceledReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "returnedReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "status": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "PROCESSING_PAYMENT",
        "PAYMENT_FAILED",
        "PAID",
        "PARTIALLY_ACCEPTED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "PROCESSING_REFUND",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "PARTIALLY_RETURNED",
        "RETURNED"
      ],
      "description": "Auto-assigned: The STATUS is automatically assigned",
      "type": "string"
    },
    "pspOrderId": {
      "description": "Auto-assigned: pspOrderLineId is automatically assigned",
      "type": "string"
    },
    "pspOrderStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspPaidAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pspRefundStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspRefundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "redirectPaymentUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "webhookUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "cancelReview": {
      "description": "Cancel review",
      "type": "boolean"
    },
    "ageCheck": {
      "description": "Automatically assigned",
      "type": "number",
      "format": "double"
    },
    "ownerId": {
      "type": "string"
    },
    "paymentOnAccountId": {
      "type": "string"
    },
    "billingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "shippingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "storeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    },
    "orderLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productSlug": {
            "type": "string"
          },
          "productImageFileName": {
            "type": "string"
          },
          "productVariantTitle": {
            "type": "string"
          },
          "productVariantSlug": {
            "type": "string"
          },
          "productVariantImageFileName": {
            "type": "string"
          },
          "productSubTitle": {
            "type": "string"
          },
          "productRetailId": {
            "type": "string"
          },
          "productSku": {
            "type": "string"
          },
          "productVariantSubTitle": {
            "type": "string"
          },
          "productVariantRetailId": {
            "type": "string"
          },
          "productVariantSku": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "productId": {
            "type": "string"
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "productTitle",
          "productSlug",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status"
        ],
        "additionalProperties": false
      }
    },
    "deliveryLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "deliveryShippingType": {
            "default": "PACKAGE",
            "enum": [
              "PACKAGE",
              "LETTERBOX",
              "CUSTOM"
            ],
            "description": "auto: deliveryShippingType TYPE is automatically assigned",
            "type": "string"
          },
          "deliveryContentsType": {
            "default": "GOODS",
            "enum": [
              "FOOD",
              "ALCOHOL",
              "GOODS",
              "BOOKS"
            ],
            "description": "auto: deliveryContentsType is automatically assigned",
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "scheduledPickupStart": {
            "description": "Add start from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledPickupEnd": {
            "description": "Add end from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryStart": {
            "description": "Add start from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryEnd": {
            "description": "Add end from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "deliveryStatus": {
            "default": "CREATED",
            "enum": [
              "CREATED",
              "BOOKING",
              "SCHEDULED",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "CANCELED",
              "RETURNED_TO_STORE"
            ],
            "description": "Auto-assign: The STATUS is automatically assigned",
            "type": "string"
          },
          "rider": {
            "type": "string"
          },
          "riderAssignedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "dispatchedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "pickedupAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "onRouteAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "deliveredAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "canceledAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "returnedToStoreAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "tookan_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliverySystem": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "pickupAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "deliveryAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "deliveryShippingType",
          "deliveryContentsType",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status",
          "scheduledPickupStart",
          "scheduledPickupEnd",
          "scheduledDeliveryStart",
          "scheduledDeliveryEnd",
          "deliveryStatus"
        ],
        "additionalProperties": false
      }
    },
    "voucherId": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "orderNumber",
    "orderType",
    "gl",
    "hl",
    "totalAmount",
    "totalTaxAmount",
    "orderAmount",
    "orderTaxAmount",
    "shippingAmount",
    "shippingTaxAmount",
    "shippingTaxRate",
    "currency",
    "status"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "dolore quis Lorem",
    "orderNumber": "ullamco laboris",
    "orderType": "DELIVERY_ORDER",
    "gl": "NL",
    "hl": "nl",
    "totalAmount": 89614552,
    "totalTaxAmount": -12073435,
    "orderAmount": -4064686,
    "orderTaxAmount": -2254474,
    "shippingAmount": -72577002,
    "shippingTaxAmount": -89311221,
    "shippingTaxRate": 0.21,
    "currency": "EUR",
    "status": "PARTIALLY_ACCEPTED",
    "orderLineItems": [
      {
        "id": "nostrud ea",
        "productTitle": "ea occaecat proident commodo s",
        "productSlug": "minim",
        "quantity": 18427278,
        "unitPrice": -64222047,
        "totalAmount": 68302233,
        "taxAmount": -81605413,
        "taxRate": 0.21,
        "status": "READY_FOR_PICKUP",
        "productVariantImageFileName": "adipisicing reprehenderit eu Excepteur",
        "updatedOn": "2986-01-16T03:21:55.983Z",
        "productImageFileName": "quis pariatur occaecat ea",
        "createdOn": "4133-12-06T07:28:50.830Z"
      },
      {
        "id": "ullamco commodo",
        "productTitle": "in",
        "productSlug": "deserunt aliqua consect",
        "quantity": -27741549,
        "unitPrice": 20495341,
        "totalAmount": -82148591,
        "taxAmount": -95219422,
        "taxRate": 0.21,
        "status": "READY_FOR_PICKUP"
      },
      {
        "id": "est",
        "productTitle": "sunt consectetur ea fugiat dolore",
        "productSlug": "est tempor amet nostrud",
        "quantity": 40882992,
        "unitPrice": -49784751,
        "totalAmount": 20714760,
        "taxAmount": 5695776,
        "taxRate": 0.21,
        "status": "PAID"
      },
      {
        "id": "velit culpa nulla labore aliqua",
        "productTitle": "aliqua nisi aute eu",
        "productSlug": "in non commodo amet",
        "quantity": -15908377,
        "unitPrice": 73099815,
        "totalAmount": -65892847,
        "taxAmount": -12197043,
        "taxRate": 0.21,
        "status": "CANCELED",
        "productRetailId": "elit occaecat"
      },
      {
        "id": "ut dolore",
        "productTitle": "sit consectetur aliqua",
        "productSlug": "ad irure eu",
        "quantity": 18046557,
        "unitPrice": -2879711,
        "totalAmount": -30305347,
        "taxAmount": 2821761,
        "taxRate": 0.21,
        "status": "ADDED",
        "updatedOn": "2918-10-19T23:29:10.549Z",
        "returnReason": "dolor ut et",
        "productRetailId": "aute irure Ut ut",
        "productVariantImageFileName": "sed veniam dolore"
      }
    ]
  }
}
```

***

### [GET]/api/Orders/{id}/billingaddress

- Summary  
Fetch hasOne relation billingaddress

#### Parameters(Query)

```ts
refresh: string
```

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "location": {
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "house": {
      "type": "string"
    },
    "appartment": {
      "type": "string"
    },
    "address1": {
      "type": "string"
    },
    "address2": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "postCode": {
      "type": "string"
    },
    "country": {
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "phone": {
      "type": "string"
    }
  },
  "required": [
    "address1",
    "lastName",
    "postCode",
    "city",
    "country"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "DeXbGEMFTz",
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
  }
}
```

***

### [POST]/api/Orders/{id}/billingaddress

- Summary  
Create new instance in billingaddress

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "location": {
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "house": {
      "type": "string"
    },
    "appartment": {
      "type": "string"
    },
    "address1": {
      "type": "string"
    },
    "address2": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "postCode": {
      "type": "string"
    },
    "country": {
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "phone": {
      "type": "string"
    }
  },
  "required": [
    "address1",
    "lastName",
    "postCode",
    "city",
    "country"
  ],
  "additionalProperties": false
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "location": {
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "house": {
      "type": "string"
    },
    "appartment": {
      "type": "string"
    },
    "address1": {
      "type": "string"
    },
    "address2": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "postCode": {
      "type": "string"
    },
    "country": {
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "phone": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "address1",
    "postCode",
    "city",
    "country",
    "lastName"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "DeXbGEMFTz",
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
  }
}
```

***

### [PUT]/api/Orders/{id}/billingaddress

- Summary  
Update billingaddress

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "location": {
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "house": {
      "type": "string"
    },
    "appartment": {
      "type": "string"
    },
    "address1": {
      "type": "string"
    },
    "address2": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "postCode": {
      "type": "string"
    },
    "country": {
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "phone": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "address1",
    "city",
    "country"
  ],
  "additionalProperties": false
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "location": {
      "properties": {
        "lat": {
          "type": "number"
        },
        "lng": {
          "type": "number"
        }
      }
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "house": {
      "type": "string"
    },
    "appartment": {
      "type": "string"
    },
    "address1": {
      "type": "string"
    },
    "address2": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "postCode": {
      "type": "string"
    },
    "country": {
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "phone": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "address1",
    "city",
    "country"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "offic",
    "address1": "consectetur aliqua mollit ven",
    "city": "commodo ea consequat irure",
    "country": "NL",
    "state": "do amet",
    "address2": "ea Duis dolore"
  }
}
```

***

### [GET]/api/Orders/{id}/deliverylineItems/{fk}

- Summary  
Find a related item by id for deliverylineItems

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "deliveryShippingType": {
      "default": "PACKAGE",
      "enum": [
        "PACKAGE",
        "LETTERBOX",
        "CUSTOM"
      ],
      "description": "auto: deliveryShippingType TYPE is automatically assigned",
      "type": "string"
    },
    "deliveryContentsType": {
      "default": "GOODS",
      "enum": [
        "FOOD",
        "ALCOHOL",
        "GOODS",
        "BOOKS"
      ],
      "description": "auto: deliveryContentsType is automatically assigned",
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "quantity": {
      "description": "Total number of items",
      "type": "number",
      "format": "double"
    },
    "unitPrice": {
      "description": "Single item amount inc. taxes, must include variant cost",
      "type": "number",
      "format": "double"
    },
    "totalAmount": {
      "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
      "type": "number",
      "format": "double"
    },
    "taxAmount": {
      "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
      "type": "number",
      "format": "double"
    },
    "taxRate": {
      "default": 0.21,
      "description": "Tax rate as defined in the product for the lined item",
      "type": "number",
      "format": "double"
    },
    "refundAmount": {
      "description": "Refund item amount",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "type": "string"
    },
    "canceledReason": {
      "type": "string"
    },
    "returnReason": {
      "type": "string"
    },
    "refundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "default": "ADDED",
      "enum": [
        "ADDED",
        "PAID",
        "PAYMENT_FAILED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "RETURNED"
      ],
      "description": "auto: STATUS is automatically assigned",
      "type": "string"
    },
    "scheduledPickupStart": {
      "description": "Add start from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledPickupEnd": {
      "description": "Add end from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryStart": {
      "description": "Add start from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryEnd": {
      "description": "Add end from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "deliveryStatus": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "BOOKING",
        "SCHEDULED",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELED",
        "RETURNED_TO_STORE"
      ],
      "description": "Auto-assign: The STATUS is automatically assigned",
      "type": "string"
    },
    "rider": {
      "type": "string"
    },
    "riderAssignedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "dispatchedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pickedupAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "onRouteAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "deliveredAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "canceledAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "returnedToStoreAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "tookan_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliverySystem": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "storeId": {
      "type": "string"
    },
    "pickupAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "deliveryAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "deliveryShippingType",
    "deliveryContentsType",
    "quantity",
    "unitPrice",
    "totalAmount",
    "taxAmount",
    "taxRate",
    "status",
    "scheduledPickupStart",
    "scheduledPickupEnd",
    "scheduledDeliveryStart",
    "scheduledDeliveryEnd",
    "deliveryStatus"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "VtBwUJhR9z",
    "deliveryShippingType": "CUSTOM",
    "deliveryContentsType": "ALCOHOL",
    "description": "packing_slip_number",
    "quantity": 1,
    "unitPrice": 6,
    "totalAmount": 6,
    "taxAmount": 1.04,
    "taxRate": 0.21,
    "status": "ADDED",
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
}
```

***

### [DELETE]/api/Orders/{id}/deliverylineItems/{fk}

- Summary  
Delete a related item by id for deliverylineItems

#### Headers

```ts
Accept?: string
```

#### Responses

- 204 Request was successful

***

### [PUT]/api/Orders/{id}/deliverylineItems/{fk}

- Summary  
Update a related item by id for deliverylineItems

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "deliveryShippingType": {
      "default": "PACKAGE",
      "enum": [
        "PACKAGE",
        "LETTERBOX",
        "CUSTOM"
      ],
      "description": "auto: deliveryShippingType TYPE is automatically assigned",
      "type": "string"
    },
    "deliveryContentsType": {
      "default": "GOODS",
      "enum": [
        "FOOD",
        "ALCOHOL",
        "GOODS",
        "BOOKS"
      ],
      "description": "auto: deliveryContentsType is automatically assigned",
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "quantity": {
      "description": "Total number of items",
      "type": "number",
      "format": "double"
    },
    "unitPrice": {
      "description": "Single item amount inc. taxes, must include variant cost",
      "type": "number",
      "format": "double"
    },
    "totalAmount": {
      "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
      "type": "number",
      "format": "double"
    },
    "taxAmount": {
      "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
      "type": "number",
      "format": "double"
    },
    "taxRate": {
      "default": 0.21,
      "description": "Tax rate as defined in the product for the lined item",
      "type": "number",
      "format": "double"
    },
    "refundAmount": {
      "description": "Refund item amount",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "type": "string"
    },
    "canceledReason": {
      "type": "string"
    },
    "returnReason": {
      "type": "string"
    },
    "refundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "default": "ADDED",
      "enum": [
        "ADDED",
        "PAID",
        "PAYMENT_FAILED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "RETURNED"
      ],
      "description": "auto: STATUS is automatically assigned",
      "type": "string"
    },
    "scheduledPickupStart": {
      "description": "Add start from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledPickupEnd": {
      "description": "Add end from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryStart": {
      "description": "Add start from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryEnd": {
      "description": "Add end from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "deliveryStatus": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "BOOKING",
        "SCHEDULED",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELED",
        "RETURNED_TO_STORE"
      ],
      "description": "Auto-assign: The STATUS is automatically assigned",
      "type": "string"
    },
    "rider": {
      "type": "string"
    },
    "riderAssignedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "dispatchedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pickedupAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "onRouteAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "deliveredAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "canceledAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "returnedToStoreAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "tookan_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliverySystem": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "storeId": {
      "type": "string"
    },
    "pickupAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "deliveryAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "deliveryShippingType",
    "deliveryContentsType",
    "quantity",
    "unitPrice",
    "totalAmount",
    "taxAmount",
    "taxRate",
    "status",
    "scheduledPickupStart",
    "scheduledPickupEnd",
    "scheduledDeliveryStart",
    "scheduledDeliveryEnd",
    "deliveryStatus"
  ],
  "additionalProperties": false
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "deliveryShippingType": {
      "default": "PACKAGE",
      "enum": [
        "PACKAGE",
        "LETTERBOX",
        "CUSTOM"
      ],
      "description": "auto: deliveryShippingType TYPE is automatically assigned",
      "type": "string"
    },
    "deliveryContentsType": {
      "default": "GOODS",
      "enum": [
        "FOOD",
        "ALCOHOL",
        "GOODS",
        "BOOKS"
      ],
      "description": "auto: deliveryContentsType is automatically assigned",
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "quantity": {
      "description": "Total number of items",
      "type": "number",
      "format": "double"
    },
    "unitPrice": {
      "description": "Single item amount inc. taxes, must include variant cost",
      "type": "number",
      "format": "double"
    },
    "totalAmount": {
      "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
      "type": "number",
      "format": "double"
    },
    "taxAmount": {
      "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
      "type": "number",
      "format": "double"
    },
    "taxRate": {
      "default": 0.21,
      "description": "Tax rate as defined in the product for the lined item",
      "type": "number",
      "format": "double"
    },
    "refundAmount": {
      "description": "Refund item amount",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "type": "string"
    },
    "canceledReason": {
      "type": "string"
    },
    "returnReason": {
      "type": "string"
    },
    "refundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "default": "ADDED",
      "enum": [
        "ADDED",
        "PAID",
        "PAYMENT_FAILED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "RETURNED"
      ],
      "description": "auto: STATUS is automatically assigned",
      "type": "string"
    },
    "scheduledPickupStart": {
      "description": "Add start from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledPickupEnd": {
      "description": "Add end from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryStart": {
      "description": "Add start from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryEnd": {
      "description": "Add end from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "deliveryStatus": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "BOOKING",
        "SCHEDULED",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELED",
        "RETURNED_TO_STORE"
      ],
      "description": "Auto-assign: The STATUS is automatically assigned",
      "type": "string"
    },
    "rider": {
      "type": "string"
    },
    "riderAssignedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "dispatchedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pickedupAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "onRouteAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "deliveredAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "canceledAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "returnedToStoreAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "tookan_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliverySystem": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "storeId": {
      "type": "string"
    },
    "pickupAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "deliveryAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "deliveryShippingType",
    "deliveryContentsType",
    "quantity",
    "unitPrice",
    "totalAmount",
    "taxAmount",
    "taxRate",
    "status",
    "scheduledPickupStart",
    "scheduledPickupEnd",
    "scheduledDeliveryStart",
    "scheduledDeliveryEnd",
    "deliveryStatus"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "Duis enim magna in",
    "deliveryShippingType": "PACKAGE",
    "deliveryContentsType": "BOOKS",
    "quantity": -56658462,
    "unitPrice": -27927247,
    "totalAmount": -46888291,
    "taxAmount": -91838834,
    "taxRate": 0.21,
    "status": "REFUNDED",
    "scheduledPickupStart": "3360-06-12T06:41:12.143Z",
    "scheduledPickupEnd": "4722-04-28T00:56:10.642Z",
    "scheduledDeliveryStart": "4145-03-13T07:25:46.160Z",
    "scheduledDeliveryEnd": "3351-01-15T02:00:26.061Z",
    "deliveryStatus": "CANCELED",
    "refundAmount": -74308551,
    "dispatchedAt": "4936-07-26T07:04:17.100Z",
    "tookan_pickup_tracking_link": "ad",
    "tookan_pickup_job_id": "anim laborum",
    "canceledReason": "pariatur ut elit"
  }
}
```

***

### [GET]/api/Orders/{id}/deliverylineItems

- Summary  
Query deliverylineItems of Order

#### Parameters(Query)

```ts
filter: string
```

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`*/*`

```ts
[]
```

***

### [POST]/api/Orders/{id}/deliverylineItems

- Summary  
Create a new instance in deliverylineItems of this model

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "deliveryShippingType": {
      "default": "PACKAGE",
      "enum": [
        "PACKAGE",
        "LETTERBOX",
        "CUSTOM"
      ],
      "description": "auto: deliveryShippingType TYPE is automatically assigned",
      "type": "string"
    },
    "deliveryContentsType": {
      "default": "GOODS",
      "enum": [
        "FOOD",
        "ALCOHOL",
        "GOODS",
        "BOOKS"
      ],
      "description": "auto: deliveryContentsType is automatically assigned",
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "quantity": {
      "description": "Total number of items",
      "type": "number",
      "format": "double"
    },
    "unitPrice": {
      "description": "Single item amount inc. taxes, must include variant cost",
      "type": "number",
      "format": "double"
    },
    "totalAmount": {
      "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
      "type": "number",
      "format": "double"
    },
    "taxAmount": {
      "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
      "type": "number",
      "format": "double"
    },
    "taxRate": {
      "default": 0.21,
      "description": "Tax rate as defined in the product for the lined item",
      "type": "number",
      "format": "double"
    },
    "refundAmount": {
      "description": "Refund item amount",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "type": "string"
    },
    "canceledReason": {
      "type": "string"
    },
    "returnReason": {
      "type": "string"
    },
    "refundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "default": "ADDED",
      "enum": [
        "ADDED",
        "PAID",
        "PAYMENT_FAILED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "RETURNED"
      ],
      "description": "auto: STATUS is automatically assigned",
      "type": "string"
    },
    "scheduledPickupStart": {
      "description": "Add start from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledPickupEnd": {
      "description": "Add end from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryStart": {
      "description": "Add start from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryEnd": {
      "description": "Add end from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "deliveryStatus": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "BOOKING",
        "SCHEDULED",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELED",
        "RETURNED_TO_STORE"
      ],
      "description": "Auto-assign: The STATUS is automatically assigned",
      "type": "string"
    },
    "rider": {
      "type": "string"
    },
    "riderAssignedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "dispatchedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pickedupAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "onRouteAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "deliveredAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "canceledAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "returnedToStoreAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "tookan_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliverySystem": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "storeId": {
      "type": "string"
    },
    "pickupAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "deliveryAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "deliveryShippingType",
    "deliveryContentsType",
    "quantity",
    "unitPrice",
    "totalAmount",
    "taxAmount",
    "taxRate",
    "status",
    "scheduledPickupStart",
    "scheduledPickupEnd",
    "scheduledDeliveryStart",
    "scheduledDeliveryEnd",
    "deliveryStatus"
  ],
  "additionalProperties": false
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "deliveryShippingType": {
      "default": "PACKAGE",
      "enum": [
        "PACKAGE",
        "LETTERBOX",
        "CUSTOM"
      ],
      "description": "auto: deliveryShippingType TYPE is automatically assigned",
      "type": "string"
    },
    "deliveryContentsType": {
      "default": "GOODS",
      "enum": [
        "FOOD",
        "ALCOHOL",
        "GOODS",
        "BOOKS"
      ],
      "description": "auto: deliveryContentsType is automatically assigned",
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "quantity": {
      "description": "Total number of items",
      "type": "number",
      "format": "double"
    },
    "unitPrice": {
      "description": "Single item amount inc. taxes, must include variant cost",
      "type": "number",
      "format": "double"
    },
    "totalAmount": {
      "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
      "type": "number",
      "format": "double"
    },
    "taxAmount": {
      "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
      "type": "number",
      "format": "double"
    },
    "taxRate": {
      "default": 0.21,
      "description": "Tax rate as defined in the product for the lined item",
      "type": "number",
      "format": "double"
    },
    "refundAmount": {
      "description": "Refund item amount",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "type": "string"
    },
    "canceledReason": {
      "type": "string"
    },
    "returnReason": {
      "type": "string"
    },
    "refundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "default": "ADDED",
      "enum": [
        "ADDED",
        "PAID",
        "PAYMENT_FAILED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "RETURNED"
      ],
      "description": "auto: STATUS is automatically assigned",
      "type": "string"
    },
    "scheduledPickupStart": {
      "description": "Add start from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledPickupEnd": {
      "description": "Add end from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryStart": {
      "description": "Add start from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryEnd": {
      "description": "Add end from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "deliveryStatus": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "BOOKING",
        "SCHEDULED",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELED",
        "RETURNED_TO_STORE"
      ],
      "description": "Auto-assign: The STATUS is automatically assigned",
      "type": "string"
    },
    "rider": {
      "type": "string"
    },
    "riderAssignedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "dispatchedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pickedupAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "onRouteAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "deliveredAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "canceledAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "returnedToStoreAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "tookan_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliverySystem": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "storeId": {
      "type": "string"
    },
    "pickupAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "deliveryAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "deliveryShippingType",
    "deliveryContentsType",
    "quantity",
    "unitPrice",
    "totalAmount",
    "taxAmount",
    "taxRate",
    "status",
    "scheduledPickupStart",
    "scheduledPickupEnd",
    "scheduledDeliveryStart",
    "scheduledDeliveryEnd",
    "deliveryStatus"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "Duis ut cupidatat amet ullamco",
    "deliveryShippingType": "CUSTOM",
    "deliveryContentsType": "ALCOHOL",
    "quantity": -13036476,
    "unitPrice": 5243114,
    "totalAmount": -22267355,
    "taxAmount": -16937938,
    "taxRate": 0.21,
    "status": "ACCEPTED",
    "scheduledPickupStart": "4388-02-24T05:37:58.461Z",
    "scheduledPickupEnd": "2637-06-20T10:06:49.588Z",
    "scheduledDeliveryStart": "2348-01-26T10:51:55.160Z",
    "scheduledDeliveryEnd": "4365-01-26T02:45:23.905Z",
    "deliveryStatus": "CREATED",
    "tookan_delivery_tracking_link": "eiusmod dolore est minim",
    "refundAmount": -3912313
  }
}
```

***

### [DELETE]/api/Orders/{id}/deliverylineItems

- Summary  
Delete all deliverylineItems of model

#### Headers

```ts
Accept?: string
```

#### Responses

- 204 Request was successful

***

### [POST]/api/Orders/{id}/completeOrder

- Summary  
Complete an order

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  // method (required field i.e. paymentonaccount), cardToken, issuer, redirectPaymentUri
  paymentData: string
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
}
```

- Examples

  - response

```json
{
  "value": {}
}
```

***

### [GET]/api/Orders/getDeliveryServiceTypes

- Summary  
Get custom delivery types

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

- Examples

  - response

```json
{
  "value": {}
}
```

***

### [GET]/api/Orders/getDeliveryServiceSlots?{pickupAddress}&{deliveryAddress}&{storeId}

- Summary  
Get the available delivery slots Date Object and time slot per date

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
[]
```

- Examples

  - response

```json
{
  "value": [
    {
      "day": "Monday",
      "date": "2021-07-12",
      "deliverySlots": [
        {
          "between": {
            "start": "16:00",
            "end": "18:00"
          },
          "betweenUTC": {
            "start": "2021-07-12T12:00:00.000Z",
            "end": "2021-07-12T14:00:00.000Z"
          },
          "pickupSlots": [
            {
              "between": {
                "start": "14:00",
                "end": "16:00"
              },
              "betweenUTC": {
                "start": "2021-07-12T10:00:00.000Z",
                "end": "2021-07-12T12:00:00.000Z"
              }
            }
          ]
        },
        {
          "between": {
            "start": "18:00",
            "end": "20:00"
          },
          "betweenUTC": {
            "start": "2021-07-12T14:00:00.000Z",
            "end": "2021-07-12T16:00:00.000Z"
          },
          "pickupSlots": [
            {
              "between": {
                "start": "14:00",
                "end": "16:00"
              },
              "betweenUTC": {
                "start": "2021-07-12T10:00:00.000Z",
                "end": "2021-07-12T12:00:00.000Z"
              }
            },
            {
              "between": {
                "start": "16:00",
                "end": "18:00"
              },
              "betweenUTC": {
                "start": "2021-07-12T12:00:00.000Z",
                "end": "2021-07-12T14:00:00.000Z"
              }
            }
          ]
        }
      ]
    },
    {
      "day": "Tuesday",
      "date": "2021-07-13",
      "deliverySlots": [
        {
          "between": {
            "start": "14:00",
            "end": "16:00"
          },
          "betweenUTC": {
            "start": "2021-07-13T10:00:00.000Z",
            "end": "2021-07-13T12:00:00.000Z"
          },
          "pickupSlots": [
            {
              "between": {
                "start": "12:00",
                "end": "14:00"
              },
              "betweenUTC": {
                "start": "2021-07-13T08:00:00.000Z",
                "end": "2021-07-13T10:00:00.000Z"
              }
            }
          ]
        },
        {
          "between": {
            "start": "16:00",
            "end": "18:00"
          },
          "betweenUTC": {
            "start": "2021-07-13T12:00:00.000Z",
            "end": "2021-07-13T14:00:00.000Z"
          },
          "pickupSlots": [
            {
              "between": {
                "start": "12:00",
                "end": "14:00"
              },
              "betweenUTC": {
                "start": "2021-07-13T08:00:00.000Z",
                "end": "2021-07-13T10:00:00.000Z"
              }
            },
            {
              "between": {
                "start": "14:00",
                "end": "16:00"
              },
              "betweenUTC": {
                "start": "2021-07-13T10:00:00.000Z",
                "end": "2021-07-13T12:00:00.000Z"
              }
            }
          ]
        },
        {
          "between": {
            "start": "18:00",
            "end": "20:00"
          },
          "betweenUTC": {
            "start": "2021-07-13T14:00:00.000Z",
            "end": "2021-07-13T16:00:00.000Z"
          },
          "pickupSlots": [
            {
              "between": {
                "start": "12:00",
                "end": "14:00"
              },
              "betweenUTC": {
                "start": "2021-07-13T08:00:00.000Z",
                "end": "2021-07-13T10:00:00.000Z"
              }
            },
            {
              "between": {
                "start": "14:00",
                "end": "16:00"
              },
              "betweenUTC": {
                "start": "2021-07-13T10:00:00.000Z",
                "end": "2021-07-13T12:00:00.000Z"
              }
            },
            {
              "between": {
                "start": "16:00",
                "end": "18:00"
              },
              "betweenUTC": {
                "start": "2021-07-13T12:00:00.000Z",
                "end": "2021-07-13T14:00:00.000Z"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

***

### [POST]/api/Orders/{id}/status/cancelOrder

- Summary  
Cancel order

- Description  
Cancel the order which is already placed

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  lineItemIds?: string
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
}
```

- Examples

  - response

```json
{
  "value": {}
}
```

***

### [GET]/api/Orders/{id}/getPackingSlip

- Summary  
Get the packing slip for the order

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  "type": "string"
}
```

#### Responses

- 200 Request was successful

`*/*`

```ts
{
  "type": "string",
  "format": "binary"
}
```

***

### [POST]/api/Orders/uploadDeliveryCSV

- Summary  
Upload a CSV feed

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  orderId?: string
}
```

#### Responses

- 200 Request was successful

`*/*`

```ts
{
  "type": "string",
  "format": "binary"
}
```

***

### [GET]/api/PostcodeRegions

- Summary  
Retrieve all postcodes and regions

- Description  
Provides a list of all postcodes and regions where Peddler operates

#### Responses

- 200 Request was successful

`application/json`

```ts
[]
```

- Examples

  - response

```json
{
  "value": [
    {
      "id": "1066",
      "region": "AMSTERDAM"
    }
  ]
}
```

***

### [GET]/api/PostcodeRegions/{postcode}

- Summary  
Retrieve single postcode and region

- Description  
Provide region of a single postcode

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
  "properties": {
    "id": {
      "type": "string"
    },
    "region": {
      "default": "AMSTERDAM",
      "enum": [
        "AMSTERDAM",
        "UTRECHT",
        "ROTTERDAM",
        "DEN_HAAG"
      ],
      "type": "string"
    }
  },
  "required": [
    "id",
    "region"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "3511",
    "region": "UTRECHT"
  }
}
```

- 422 Not found

`application/json`

```ts
{
  "properties": {
    "message": {
      "type": "string",
      "default": "Not available for delivery"
    }
  },
  "required": [
    "message"
  ],
  "additionalProperties": false
}
```

- Examples

  - response

```json
{
  "value": {
    "message": "Postcode not found"
  }
}
```

***

### [GET]/api/PostcodeRegions/validatePostcode

- Summary  
Validate postcode

- Description  
Checks if the postcode is valid and is in Peddler operations area and returns the region

#### Parameters(Query)

```ts
postcode: string
```

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
}
```

- Examples

  - response

```json
{
  "value": {
    "id": "1066",
    "region": "AMSTERDAM"
  }
}
```

***

### [GET]/api/Peddlers/{id}/stores

- Summary  
Query stores of Peddler

#### Parameters(Query)

```ts
filter?: string
```

#### Headers

```ts
Accept?: string
```

#### Responses

- 200 Request was successful

`application/json`

```ts
[]
```

- Examples

  - response

```json
{
  "value": [
    {
      "id": "sbFdcFPpRmH",
      "hl": "en",
      "title": "Peddler Amsterdam Jeans Store",
      "subTitle": "The brands you love with local delivery at online prices",
      "description": "<h3>About Peddler<h3> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "instagram": "https://www.instagram.com/peddler",
      "facebook": "https://www.facebook.com/peddlerdotcom/",
      "twitter": "https://twitter.com/peddle_it",
      "pickupInStore": true,
      "processingTime": 30,
      "slug": "peddler-amsterdam-jeans-store",
      "customDeliveryRate": 6,
      "rating": 0,
      "reviewCount": 0,
      "openingTimes": {
        "monday": {
          "opens": "07:00",
          "closes": "20:00"
        },
        "tuesday": {
          "opens": "07:00",
          "closes": "20:00"
        },
        "wednesday": {
          "opens": "07:00",
          "closes": "20:00"
        },
        "thursday": {
          "opens": "07:00",
          "closes": "20:00"
        },
        "friday": {
          "opens": "07:00",
          "closes": "20:00"
        },
        "saturday": {
          "opens": "09:00",
          "closed": true
        },
        "sunday": {
          "opens": "09:00",
          "closes": "20:00"
        }
      },
      "regions": [
        "AMSTERDAM"
      ],
      "ownerId": "pHa3x-GWBn",
      "retailerId": "IU71hR6wdq",
      "storeAddress": {
        "id": "DeXbGEMFTz",
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
      "createdOn": "2021-07-12T15:33:41.048Z",
      "updatedOn": "2021-07-12T15:33:41.140Z",
      "localised": [
        {
          "hl": "nl",
          "title": "Peddler Amsterdam Jeans Winkel",
          "description": "Een slimme locale winkel",
          "slug": "peddler-amsterdam-jeans-winkel"
        }
      ],
      "storeImage": {
        "id": "HOO3055IuZ6",
        "modelType": "Store",
        "fileName": "/lokl/path/image-pmyml6hclu-name",
        "position": 0,
        "ownerId": "pHa3x-GWBn",
        "storeId": "sbFdcFPpRmH"
      },
      "categoryList": [
        {
          "id": "By_PXJPYST",
          "hl": "en",
          "title": "Fashion",
          "slug": "fashion",
          "position": 0,
          "categoryImage": {
            "id": "90g4VPLs_U",
            "modelType": "Category",
            "fileName": "/lokl/path/image-z1-wcorcm-name",
            "position": 0
          },
          "localised": [
            {
              "hl": "nl",
              "title": "Kleding & Mode",
              "slug": "kleding-and-mode"
            }
          ],
          "createdOn": "2021-07-12T15:33:39.240Z",
          "updatedOn": "2021-07-12T15:33:39.304Z"
        }
      ],
      "retailerCategoryList": [
        {
          "id": "g8N0dX36Y3",
          "hl": "en",
          "title": "Dresses",
          "slug": "dresses",
          "position": 0,
          "storeId": "sbFdcFPpRmH",
          "localised": [
            {
              "hl": "nl",
              "title": "Jurken",
              "slug": "jurken"
            }
          ],
          "RetailerCategoryIds": [],
          "createdOn": "2021-07-12T15:33:41.047Z",
          "updatedOn": "2021-07-12T15:33:41.056Z"
        }
      ],
      "RetailerCategoryIds": []
    }
  ]
}
```

***

### [POST]/api/Peddlers/validateAddress

- Summary  
Validate address for specific catchment area

#### Headers

```ts
Accept?: string
```

#### RequestBody

- application/json

```ts
{
  addressObject: {
  }
  pickupAddress: {
  }
}
```

#### Responses

- 200 Request was successful

`application/json`

```ts
{
}
```

- Examples

  - response

```json
{
  "value": {}
}
```

## References

### #/components/securitySchemes/BearerAuth

```ts
{
  "type": "http",
  "scheme": "BeAreR"
}
```

### #/components/requestBodies/Create_a_new_instance_of_the_model_and_persist_it_into_the_data_source.Body

- application/json

```ts
{
  "description": "Model instance data",
  "properties": {
    "id": {
      "description": "Auto-assigned: Short Id is automatically generated",
      "type": "string"
    },
    "orderNumber": {
      "description": "Auto-assigned: Order Number is automatically generated",
      "type": "string"
    },
    "orderType": {
      "default": "PRODUCT_ORDER",
      "enum": [
        "PRODUCT_ORDER",
        "DELIVERY_ORDER"
      ],
      "type": "string"
    },
    "gl": {
      "default": "NL",
      "enum": [
        "NL"
      ],
      "type": "string"
    },
    "hl": {
      "enum": [
        "en",
        "nl"
      ],
      "type": "string"
    },
    "totalAmount": {
      "description": "Auto-assigned: Total: shippingAmount + orderAmount",
      "type": "number",
      "format": "double"
    },
    "totalTaxAmount": {
      "description": "Auto-assigned: Tax: shippingTaxAmount + orderTaxAmount",
      "type": "number",
      "format": "double"
    },
    "orderAmount": {
      "description": "Auto-assigned: Total order amount inc. taxes - must add up to each line item (totalAmount)",
      "type": "number",
      "format": "double"
    },
    "orderTaxAmount": {
      "description": "Auto-assigned: Total lineitem taxes - must add up to each line item (taxAmount)",
      "type": "number",
      "format": "double"
    },
    "shippingAmount": {
      "description": "Auto-assigned: Total shipping cost inc. taxes",
      "type": "number",
      "format": "double"
    },
    "shippingTaxAmount": {
      "description": "Auto-assigned: Shipping tax: shippingAmount ├ù (shippingTaxRate / (1 + shippingTaxRate))",
      "type": "number",
      "format": "double"
    },
    "shippingTaxRate": {
      "default": 0.21,
      "description": "Auto-assigned: Tax amount in decimal point 21% = 0.21",
      "type": "number",
      "format": "double"
    },
    "discountAmount": {
      "description": "Auto: Discount for this order inc. taxes (based on voucher)",
      "type": "number",
      "format": "double"
    },
    "commission": {
      "description": "Auto-assigned: Total commission for order inc. taxes - must add up to each line item (commission)",
      "type": "number",
      "format": "double"
    },
    "currency": {
      "default": "EUR",
      "description": "Auto-assigned: based on shipping address country",
      "type": "string"
    },
    "rating": {
      "description": "Auto-assigned/restricted",
      "type": "number",
      "format": "double"
    },
    "comment": {
      "type": "string"
    },
    "refundTotal": {
      "description": "Auto-assigned: refunded",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "description": "Auto-assigned",
      "type": "string"
    },
    "refundReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "canceledReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "returnedReason": {
      "description": "Auto-assigned",
      "type": "string"
    },
    "status": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "PROCESSING_PAYMENT",
        "PAYMENT_FAILED",
        "PAID",
        "PARTIALLY_ACCEPTED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "PROCESSING_REFUND",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "PARTIALLY_RETURNED",
        "RETURNED"
      ],
      "description": "Auto-assigned: The STATUS is automatically assigned",
      "type": "string"
    },
    "pspOrderId": {
      "description": "Auto-assigned: pspOrderLineId is automatically assigned",
      "type": "string"
    },
    "pspOrderStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspPaidAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pspRefundStatus": {
      "description": "Auto-assigned: pspOrderStatus is automatically assigned",
      "type": "string"
    },
    "pspRefundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "redirectPaymentUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "webhookUri": {
      "description": "Auto-assigned: redirectPaymentUri is automatically assigned",
      "type": "string"
    },
    "cancelReview": {
      "description": "Cancel review",
      "type": "boolean"
    },
    "ageCheck": {
      "description": "Automatically assigned",
      "type": "number",
      "format": "double"
    },
    "ownerId": {
      "type": "string"
    },
    "paymentOnAccountId": {
      "type": "string"
    },
    "billingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "shippingAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "storeIds": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    },
    "orderLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productSlug": {
            "type": "string"
          },
          "productImageFileName": {
            "type": "string"
          },
          "productVariantTitle": {
            "type": "string"
          },
          "productVariantSlug": {
            "type": "string"
          },
          "productVariantImageFileName": {
            "type": "string"
          },
          "productSubTitle": {
            "type": "string"
          },
          "productRetailId": {
            "type": "string"
          },
          "productSku": {
            "type": "string"
          },
          "productVariantSubTitle": {
            "type": "string"
          },
          "productVariantRetailId": {
            "type": "string"
          },
          "productVariantSku": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "productId": {
            "type": "string"
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "productTitle",
          "productSlug",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status"
        ],
        "additionalProperties": false
      }
    },
    "deliveryLineItems": {
      "type": "array",
      "items": {
        "properties": {
          "id": {
            "description": "Auto-assigned:Short Id is automatically generated",
            "type": "string"
          },
          "deliveryShippingType": {
            "default": "PACKAGE",
            "enum": [
              "PACKAGE",
              "LETTERBOX",
              "CUSTOM"
            ],
            "description": "auto: deliveryShippingType TYPE is automatically assigned",
            "type": "string"
          },
          "deliveryContentsType": {
            "default": "GOODS",
            "enum": [
              "FOOD",
              "ALCOHOL",
              "GOODS",
              "BOOKS"
            ],
            "description": "auto: deliveryContentsType is automatically assigned",
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "quantity": {
            "description": "Total number of items",
            "type": "number",
            "format": "double"
          },
          "unitPrice": {
            "description": "Single item amount inc. taxes, must include variant cost",
            "type": "number",
            "format": "double"
          },
          "totalAmount": {
            "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
            "type": "number",
            "format": "double"
          },
          "taxRate": {
            "default": 0.21,
            "description": "Tax rate as defined in the product for the lined item",
            "type": "number",
            "format": "double"
          },
          "refundAmount": {
            "description": "Refund item amount",
            "type": "number",
            "format": "double"
          },
          "refundType": {
            "enum": [
              "OUT_OF_STOCK",
              "DUPLICATE",
              "FRAUD",
              "CUSTOMER_REQUEST",
              "OTHER"
            ],
            "type": "string"
          },
          "canceledReason": {
            "type": "string"
          },
          "returnReason": {
            "type": "string"
          },
          "refundedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "default": "ADDED",
            "enum": [
              "ADDED",
              "PAID",
              "PAYMENT_FAILED",
              "ACCEPTED",
              "READY_FOR_PICKUP",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "COMPLETED",
              "REFUNDED",
              "PARTIALLY_REFUNDED",
              "CANCELED",
              "RETURNED"
            ],
            "description": "auto: STATUS is automatically assigned",
            "type": "string"
          },
          "scheduledPickupStart": {
            "description": "Add start from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledPickupEnd": {
            "description": "Add end from pickup slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryStart": {
            "description": "Add start from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "scheduledDeliveryEnd": {
            "description": "Add end from delivery slot",
            "type": "string",
            "format": "date-time"
          },
          "deliveryStatus": {
            "default": "CREATED",
            "enum": [
              "CREATED",
              "BOOKING",
              "SCHEDULED",
              "RIDER_DISPATCHED",
              "IN_TRANSIT",
              "DELIVERED",
              "CANCELED",
              "RETURNED_TO_STORE"
            ],
            "description": "Auto-assign: The STATUS is automatically assigned",
            "type": "string"
          },
          "rider": {
            "type": "string"
          },
          "riderAssignedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "dispatchedAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "pickedupAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "onRouteAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "deliveredAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "canceledAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "returnedToStoreAt": {
            "description": "Automatically assigned",
            "type": "string",
            "format": "date-time"
          },
          "tookan_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_job_id": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_pickup_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "tookan_delivery_tracking_link": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "pickupTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTaskId": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliveryTrackingUrl": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "deliverySystem": {
            "description": "Automatically assigned",
            "type": "string"
          },
          "storeId": {
            "type": "string"
          },
          "pickupAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "deliveryAddress": {
            "properties": {
              "id": {
                "description": "Auto-assigned:Short Id is automatically generated",
                "type": "string"
              },
              "location": {
                "properties": {
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  }
                }
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "house": {
                "type": "string"
              },
              "appartment": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "postCode": {
                "type": "string"
              },
              "country": {
                "enum": [
                  "NL"
                ],
                "type": "string"
              },
              "phone": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "address1",
              "city",
              "country"
            ],
            "additionalProperties": false
          },
          "createdOn": {
            "type": "string",
            "format": "date-time"
          },
          "updatedOn": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "id",
          "deliveryShippingType",
          "deliveryContentsType",
          "quantity",
          "unitPrice",
          "totalAmount",
          "taxAmount",
          "taxRate",
          "status",
          "scheduledPickupStart",
          "scheduledPickupEnd",
          "scheduledDeliveryStart",
          "scheduledDeliveryEnd",
          "deliveryStatus"
        ],
        "additionalProperties": false
      }
    },
    "voucherId": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "orderNumber",
    "orderType",
    "gl",
    "hl",
    "totalAmount",
    "totalTaxAmount",
    "orderAmount",
    "orderTaxAmount",
    "shippingAmount",
    "shippingTaxAmount",
    "shippingTaxRate",
    "currency",
    "status"
  ],
  "additionalProperties": false
}
```

### #/components/requestBodies/Update_a_related_item_by_id_for_deliverylineItems.Body

- application/json

```ts
{
  "properties": {
    "id": {
      "description": "Auto-assigned:Short Id is automatically generated",
      "type": "string"
    },
    "deliveryShippingType": {
      "default": "PACKAGE",
      "enum": [
        "PACKAGE",
        "LETTERBOX",
        "CUSTOM"
      ],
      "description": "auto: deliveryShippingType TYPE is automatically assigned",
      "type": "string"
    },
    "deliveryContentsType": {
      "default": "GOODS",
      "enum": [
        "FOOD",
        "ALCOHOL",
        "GOODS",
        "BOOKS"
      ],
      "description": "auto: deliveryContentsType is automatically assigned",
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "quantity": {
      "description": "Total number of items",
      "type": "number",
      "format": "double"
    },
    "unitPrice": {
      "description": "Single item amount inc. taxes, must include variant cost",
      "type": "number",
      "format": "double"
    },
    "totalAmount": {
      "description": "Total item amount inc. taxes: (unitPrice x quantity) - discount",
      "type": "number",
      "format": "double"
    },
    "taxAmount": {
      "description": "Total tax amount for line item: totalAmount ├ù (taxRate / (1 + taxRate))",
      "type": "number",
      "format": "double"
    },
    "taxRate": {
      "default": 0.21,
      "description": "Tax rate as defined in the product for the lined item",
      "type": "number",
      "format": "double"
    },
    "refundAmount": {
      "description": "Refund item amount",
      "type": "number",
      "format": "double"
    },
    "refundType": {
      "enum": [
        "OUT_OF_STOCK",
        "DUPLICATE",
        "FRAUD",
        "CUSTOMER_REQUEST",
        "OTHER"
      ],
      "type": "string"
    },
    "canceledReason": {
      "type": "string"
    },
    "returnReason": {
      "type": "string"
    },
    "refundedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "default": "ADDED",
      "enum": [
        "ADDED",
        "PAID",
        "PAYMENT_FAILED",
        "ACCEPTED",
        "READY_FOR_PICKUP",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "REFUNDED",
        "PARTIALLY_REFUNDED",
        "CANCELED",
        "RETURNED"
      ],
      "description": "auto: STATUS is automatically assigned",
      "type": "string"
    },
    "scheduledPickupStart": {
      "description": "Add start from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledPickupEnd": {
      "description": "Add end from pickup slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryStart": {
      "description": "Add start from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "scheduledDeliveryEnd": {
      "description": "Add end from delivery slot",
      "type": "string",
      "format": "date-time"
    },
    "deliveryStatus": {
      "default": "CREATED",
      "enum": [
        "CREATED",
        "BOOKING",
        "SCHEDULED",
        "RIDER_DISPATCHED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELED",
        "RETURNED_TO_STORE"
      ],
      "description": "Auto-assign: The STATUS is automatically assigned",
      "type": "string"
    },
    "rider": {
      "type": "string"
    },
    "riderAssignedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "dispatchedAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "pickedupAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "onRouteAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "deliveredAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "canceledAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "returnedToStoreAt": {
      "description": "Automatically assigned",
      "type": "string",
      "format": "date-time"
    },
    "tookan_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_job_id": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_pickup_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "tookan_delivery_tracking_link": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "pickupTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTaskId": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliveryTrackingUrl": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "deliverySystem": {
      "description": "Automatically assigned",
      "type": "string"
    },
    "storeId": {
      "type": "string"
    },
    "pickupAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "deliveryAddress": {
      "properties": {
        "id": {
          "description": "Auto-assigned:Short Id is automatically generated",
          "type": "string"
        },
        "location": {
          "properties": {
            "lat": {
              "type": "number"
            },
            "lng": {
              "type": "number"
            }
          }
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "house": {
          "type": "string"
        },
        "appartment": {
          "type": "string"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postCode": {
          "type": "string"
        },
        "country": {
          "enum": [
            "NL"
          ],
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "address1",
        "city",
        "country"
      ],
      "additionalProperties": false
    },
    "createdOn": {
      "type": "string",
      "format": "date-time"
    },
    "updatedOn": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "deliveryShippingType",
    "deliveryContentsType",
    "quantity",
    "unitPrice",
    "totalAmount",
    "taxAmount",
    "taxRate",
    "status",
    "scheduledPickupStart",
    "scheduledPickupEnd",
    "scheduledDeliveryStart",
    "scheduledDeliveryEnd",
    "deliveryStatus"
  ],
  "additionalProperties": false
}
```

### #/components/requestBodies/Get_the_packing_slip_for_the_orderXordernumber

- application/json

```ts
{
  "type": "string"
}
```
