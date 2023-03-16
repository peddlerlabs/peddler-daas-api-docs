---
sidebar_position: 2
---

# Customise package

In order to select different package types or custom rates, you can use the our GET /api/Orders/getDeliveryServiceTypes endpoint.
This endpoint respondse with a JSON object two distinct properties
- `deliveryShippingTypes`: array which defines the different package types and rates in the stores currency (commonly EUR) available to the respective store. 
  - The `deliveryShippingType` ENUM property is set per deliveryLineItem and would imply the respective rate is utilised and the respective package size is adhered to. Should our fleet encounter a different size of package, a surcharge would be applied for the full amount. 
- `deliveryContentsTypes`: array which defines the contents of the package, the 4 common types are respectively:  
    - FOOD
    - ALCOHOL
    - GOODS
    - BOOKS
  - The `deliveryContentsType` ENUM property is set per deliveryLineItem and would imply the respective line item is handled accordingly, for example for FOOD it would be shipped with cooling units, and for ALCOHOL a respective age check is conducted. 

:::danger Important
  
Should your package contain both ALCOHOL and FOOD, ALCOHOL should prevail.

:::  
  
**For example when quering the `/getDeliveryServiceTypes` endpoint, you should expect the following object returned.**

```json
{
    "deliveryShippingTypes": [
        {
            "type": "PACKAGE",
            "price": 7.99
        },
        {
            "type": "LETTERBOX",
            "price": 4.59
        },
        {
            "type": "CUSTOM",
            "price": 5,
            "store": {
                "id": "x7f9T2Nbpe",
                "hl": "en",
                "title": "Peddler Amsterdam Jeans Store",
                "slug": "peddler-amsterdam-jeans-store",
            }
        }
    ],
    "deliveryContentsTypes": [
        {
            "type": "FOOD",
            "taxRate": 0.21
        },
        {
            "type": "ALCOHOL",
            "taxRate": 0.21
        },
        {
            "type": "GOODS",
            "taxRate": 0.21
        },
        {
            "type": "BOOKS",
            "taxRate": 0.21
        }
    ]
}
```
