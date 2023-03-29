---
sidebar_position: 5
---

# Shipment status

In this section, you will find the exaplantion of the shipment lifecycle. In other words, the status of a shipment. 

## Table of status

Following is a list of all the possible shipment statuses:

| STATUS | Description |
|:---:|---|
| ````SHIPMENT_CONFIRMED```` | Shipment confirmed (est. date/time of arrival) |
| ``SHIPMENT_IN_WAREHOUSE`` | Shipment in warehouse (est. date/time of arrival + map) |
| ``OUT_FOR_DELIVERY`` | Out for delivery (est. date/time of arrival + map) |
| ``DELIVERED`` | Delivered (optional: delivered at neighbours + details) |
| ``DELIVERED_COLLECTION_POINT`` | Delivered at Collection point (+ details) |
| ``FAILED_ATTEMPT`` | (REASON: Customer not answering, Wrong/incomplete address, Issue with package, Refused by customer + NEXT ATTEMPT or CONTACT SUPPORT) |
| ``ON_HOLD`` | Shipment is currently on hold and waiting to be released on the designated timeslot or paused by support |
| ``EXCEPTION`` | All other issues related to package or address |
| ``RETURN_TO_SENDER`` | Shipment has been returned to sender |
| ``CANCELED`` | Shipment has been canceled by sender/carrier |
| ``SHIPMENT_DETAILS_UPDATED`` | Delivery details updated - for example address change or change by consignee |

## Status details

When a shipment is queried, all the statuses for the shipment are returned. Each of the status has a timestamp `ts` and a description `details`.
- The description is a human readable text that explains the status.
- The timestamp is the time when the status was set.

Apart from the aforementioned contents `ts` & `details`, some more information is returned for the statuses. These are described below.
### ````SHIPMENT_CONFIRMED````

Shipment confirmed (est. date/time of arrival)

### ``SHIPMENT_IN_WAREHOUSE``

Shipment in warehouse (est. date/time of arrival + map)

### ``OUT_FOR_DELIVERY``

Out for delivery (est. date/time of arrival + map)

### ``DELIVERED``

Delivered (optional: delivered at neighbours + details)

### ``DELIVERED_COLLECTION_POINT``

Delivered at Collection point (+ details)

### ``FAILED_ATTEMPT``

(REASON: Customer not answering, Wrong/incomplete address, Issue with package, Refused by customer + NEXT ATTEMPT or CONTACT SUPPORT)

### ``ON_HOLD``

shipment is currently on hold and waiting to be released on the designated timeslot or paused by support

### ``EXCEPTION``

all other issues related to package or address

### ``RETURN_TO_SENDER``

### ``CANCELED``

### ``SHIPMENT_DETAILS_UPDATED``

Delivery details updated - for example address change or change by consignee