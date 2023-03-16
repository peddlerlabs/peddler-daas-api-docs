---
sidebar_position: 3
---

# Delivery order status lifecycles

You may require to understand where the order is in terms of its delivery lifecycle. 
This is denoted by the order status property i.e. the order state.
Furthermore orders cannot be modified or canceled when in certain states (for example, if a rider has already been dispatched).
As an order can have multiple delivery line items, the "status" i.e. state is also provided per delivery line item.

:::tip Note

We recommend utilising the individual delivery line item status to track the progress of any given order.

:::

## Order status

Order statuses are bound to the 'status' (string) property of the respective order instance.
Order statuses follow the following progressive lifecycle:

- `CREATED`: Order is still in its creation state it can be modified freely
- `PROCESSING_PAYMENT`: Order is being settled by our PSP or internal accounts
- `PAID`: Order has been fully PAID
- `PAYMENT_FAILED`: Order has not been accepted and has FAILED
- `ACCEPTED`: The order has been accepted by our team and has been scheduled for delivery
- `READY_FOR_PICKUP`: At least one or more delivery line items have been assigned to a courier team and can no longer be CANCELLED
- `RIDER_DISPATCHED`: At least one or more delivery line items have a courier on their way to the pickup location (store)
- `IN_TRANSIT`: At least one or more delivery line items a courier on their way to the delivery location (customer)
- `DELIVERED`: ALL delivery line items a have been succesfully delivered at the (customer)
- `COMPLETED`: The order is fully complete (no futher actions)
- `PROCESSING_REFUND`: A refund is being processed for the order
- `REFUNDED`: The order has been refunded
- `CANCELED`: The order has been cancelled
- `RETURNED`: At least one or more delivery line items a have been returned. The order has been returned to the pickup location (store), i.e. not able to deliver after multiple attempts

:::tip Important

1. You can only **modify** an order and its respective child delivery line items when in the following state(s): 'CREATED'
2. You can only **cancel** an order and its respective child delivery line items when in the following state(s): 'CREATED', 'PAID', 'ACCEPTED'

:::

## Delivery line item status
Delivery line item statuses are bound to the 'status' (string) property of the respective delivery line item. 
Note the deliveryStatus is used for more advanced lifeCycle management and is not applicable.
Delivery line item statuses follow the following progressive lifecycle:

- `ADDED`: Delivery line item has been added and can be modified freely.
- `PROCESSING_PAYMENT`: Delivery line item is being settled by our PSP or internal accounts
- `PAID`: Delivery line item paid
- `PAYMENT_FAILED`: Delivery line item has not been accepted and has FAILED
- `ACCEPTED`: Delivery line item has been accepted by our team and has been scheduled for delivery
- `READY_FOR_PICKUP`: Delivery line item has been assigned to a courier team and can no longer be CANCELED
- `RIDER_DISPATCHED`: Delivery line item courier on their way to the pickup location (store)
- `IN_TRANSIT`: Delivery line item courier on their way to the delivery location (customer)
- `DELIVERED`: Delivery line item has succesfully been delivered to the (customer)
- `COMPLETED`: Delivery line is fully complete (no futher actions)
- `REFUNDED`: Delivery line item refunded
- `CANCELED`: Delivery line item CANCELED
- `RETURNED`: Delivery line item has been returned to the pickup location (store) as it could not be delivered on multiple attempts.

In addition to the above we assign specific properties when the lifecycle is updated, for example:
- `riderAssignedAt`: date-time stamp when the courier has been assigned
- `dispatchedAt` ( ISO-8601 ): date-time stamp when the courier has been dispatched
- `pickedupAt`: date-time stamp when the courier has picked up the delivery (store)
- `onRouteAt`: date-time stamp when the courier is en route to the customer
- `deliveredAt`: date-time stamp when the courier has delivered to the customer
- `canceledAt`: date-time stamp when the courier has delivered to the customer
- `returnedToStoreAt`: date-time stamp when the courier has returned an item to the store

## Live delivery tracking
Individual deliveries can be tracked during the order lifecycle. Tracking Urls are provided dynamically and are available during certain order states.
The links provide a map with a location of the courier.

Each delivery line item has the following properties, once the lifecycle has been transitioned to the ACCEPTED status state:
- `deliveryTrackingUrl`: (URL) with secure link for delivery tracking - this is only available for security reasons whilst the delivery is in progress
- `pickupTrackingUrl`: (URL) with secure link for pickup tracking - this is only available for security reasons whilst the pickup is in progress

