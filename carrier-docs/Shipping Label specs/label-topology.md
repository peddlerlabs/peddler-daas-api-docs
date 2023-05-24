---
sidebar_position: 2
---

# Topology of label

## Specifications

The various sections of the label are described below:

![Peddler Shipping Label topology](/img/peddler-shipping-label-topology.png)

### 1. Partner Client name

This is the name of the Enterprise using the Peddler Express Shipping services. This is a mandatory field and is used to identify the client.

### 2. Sender address

This section contains the sender's address. This is a mandatory field and is used to identify the sender. This section contains the following fields:

- Sender company name
- Sender name
- Sender address split into 3 lines

### 3. Recipient address

This section contains the recipient's address. This is a mandatory field and is used to identify the recipient. This section contains the following fields:

- Recipient company name
- Recipient name
- Recipient address split into 4 lines

### 4. Shipment information

This section contains the shipment information. This is a mandatory field and is used to identify the shipment. This section contains the following fields:

- Reference number
- Ship on date
- Weight of the shipment
- Colli (number of packages in the shipment)

:::tip Definition of Colli

Colli is a term used in the shipping industry to refer to the number of packages in a shipment. It is used to identify the number of packages in a shipment.

:::

### 5. 1-Dimensional Linear Barcode (Code 128)

This is a mandatory field and is used to identify the shipment. This is a 1D barcode and is used to identify the shipment. This barcode is used by the carrier to track the shipment through the carrier's network. It is always ``19`` character in length and starts with the letter '**P**'.

:::note Note

More information about the barcode can be found in the [Barcode section](/docs/shipping-label-specs/barcode).

:::

### 6. 2-Dimensional QR Code (alphanumeric)

This is a mandatory field and is used to identify the shipment. This is a 2D barcode and is used to identify the shipment. This barcode is used by the carrier to track the shipment through the carrier's network. It is in ALPHANUMERIC format and is always ``54`` characters long.

:::note Note

More information about the barcode can be found in the [Barcode section](/docs/shipping-label-specs/barcode).

:::

### 7. Recipient contact details / additional information

This is an optional section and is used to provide additional information about the recipient. Additional information can be phone number, email address, etc.

### 8. Final Destination depot code

This is a mandatory field and is used to identify the final destination depot. It refers to the local hub from the package is processed. This is a 3 character code.

### 9. Peddler-only area (for internal use)

This is a mandatory field and is used for internal use only. This section contains the following fields:

- Route code
- Delivery date + time
- Delivery at neighbour check
- Collection from PUDO check
- Position of shipment in the route