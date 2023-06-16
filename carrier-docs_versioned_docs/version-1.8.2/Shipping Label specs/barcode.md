---
sidebar_position: 4
---

# Barcode specification

Peddler Shipping Label contains two barcodes:

- 1-Dimensional Linear Barcode (Code 128)
- 2-Dimensional QR Code (alphanumeric)

## 1-Dimensional Linear Barcode (Code 128)

This 1-D barcode contains the Peddler tracking number and is used by the carrier to track the shipment through the carrier's network.

### Barcode format

- **Length**: 19 characters
- **Starts with**: ``P``
- **Format**: ``P{18-digit-number}``
- **Example**: ``P123456789012345678``
- **Barcode type**: Code 128

### Barcode content

![Peddler Shipping Label 1-D barcode](/img/peddler-shipping-label-1d-barcode.png)

The barcode contains the following information:

1. Prefix **P** identifies Peddler tracking number
2. 5 digit epoch number
3. 2 digit service level indicator
4. 10 digit hashed ID of Peddler package manifest ID
5. [Luhn](https://en.wikipedia.org/wiki/Luhn_algorithm) check digit


## 2-Dimensional QR Code (alphanumeric)

This 2-D barcode contains the Peddler tracking number and is used by the carrier to track the shipment through the carrier's network. It is in ALPHANUMERIC format and is always ``54`` characters long.

![Peddler Shipping Label 2-D barcode](/img/peddler-shipping-label-2d-barcode.png)

### QR code format

- **Length**: 54 characters
- **Format**: ``{54-character-alphanumeric-string}``
- **Example**: ``P195006030047955057%1234567890%1234567890%0000012360%7``
- **Barcode type**: QR Code

### QR code content

![Peddler Shipping Label 2-D barcode description](/img/peddler-shipping-label-2d-barcode-desc.png)

1. Peddler tracking number
2. 10 digit internal order identification number
3. 10 digit unique internal client/account identification number
4. 10 digit options hash describing HUB, SLA etc.
5. Luhn check digit
