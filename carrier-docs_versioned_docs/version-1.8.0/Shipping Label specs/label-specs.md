---
sidebar_position: 3
---

# Label Specifications

Each field of the label has some constraints that need to be followed for proper functioning of the label. 

A template is attached below for explaining the constraints of each field of the label:

![Peddler Shipping Label template](/img/peddler-shipping-label-template.png)

## Constraints of fields

The constraints along with the field name and description for the Peddler Shipping Label are described below:

| **Field** | **Description** | **Constraints** |
|:---|:---|:---|
| PARTNER_CLIENT_NAME | The Enterprise which is using Peddler Express services | String with maximum of 16 characters |
| SENDER_ADR_LINE_1 | Company Name of the Sender | String with maximum of 24 characters |
| SENDER_ADR_LINE_2 | Name of the Sender | String with maximum of 24 characters |
| SENDER_ADR_LINE_3 | Street name + House number | String with maximum of 24 characters |
| SENDER_ADR_LINE_4  | Postal Code + City | String with maximum of 24 characters |
| SENDER_ADR_LINE_5  | Country | String with maximum of 24 characters |
| RECEIVER_ADR_LINE_1 | Company Name of the Recipient | String with maximum of 18 characters |
| RECEIVER_ADR_LINE_2 | Name of the Recipient | String with maximum of 24 characters |
| RECEIVER_ADR_LINE_3  | Street name + House number | String with maximum of 24 characters |
| RECEIVER_ADR_LINE_4  | Additional info about address | String with maximum of 24 characters |
| RECEIVER_ADR_LINE_5  | Postal Code + City | String with maximum of 24 characters |
| RECEIVER_ADR_LINE_6 | Country | String with maximum of 24 characters |
| OPT_INF_1…OPT_INF_5 | Additional information related to the consignment | If field contains only alphabets (for field title), maximum of 9 characters are allowed. If field contains only digits + special characters, a maximum of 14 characters are allowed. |
| D | 3-character code for Final Destination depot. Example: AMS (for Amsterdam-1) | String with maximum of 3 characters |
| REF_LBL_1  | Title for Reference | Value: **REF** |
| REF_INF_1  | Reference/Waybill number | Alphanumeric with maximum of 16 characters |
| REF_LBL_2  | Title for Ship on date | Value: **SHIP ON** |
| REF_INF_2  | Date of shipping | Format: DD/MM/YYYY For example: ``30/12/2023`` |
| REF_LBL_3  | Title for Weight | Value: **WEIGHT** |
| REF_INF_3  | Weight of the shipment | Numeric value + units of weight. String with maximum length of 8 characters. For example: ``19.99 KG`` |
| C | Colli | Value can be integer (eg: 1) or fraction (eg: 2/3) |
| BARCODE_LABEL_1  | 1-Dimensional Linear Barcode (Code 128) | String with **fixed** length of 19 characters. <br /> Format: `P{α} {β} {γ} {δ}` where, `α`: 5-digit epoch number, `β`: 2-digit service level indicator, `γ`: 10-digit hash of Peddler package manifest ID & `δ`: Luhn check digit |

## Constaints of Peddler-only fields

These fields are for internal use only and are not relevant to the Enterprise. The constarints for these fields are described below:

| **Field** | **Description** | **Constraints** |
|:---|:---|:---|
| LOOP_LBL_1  | Title for Route | Value: **Route** |
| L_1  | Route number associated with the shipment | Numeric with maximum of 5 digits |
| LOOP_LBL_2 | Title for Delivery date | Value: DLR DATE |
| L_2  | Expected delivery date + time | Format: DD/MM/YYYY HH:MM For example: ``30/12/2023 22:30`` |
| LOOP_EXTRA_1  | Whether package has to be delivered at the neighbours | Value: **Neighbour** + boolean value (Yes/No) |
| LOOP_EXTRA_2  | Whether package has to be collected from nearest Pick-up/Drop-off point | Value: **PUDO** + boolean value (Yes/No) |
| P | Position of the shipment in its route | Numeric value with a maximum of 3 digits |