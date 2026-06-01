---
sidebar_position: 1
---

# Postcode

In this section, you will find the how to get all the postcodes where Peddler offers its delivery services.

### Get all postcodes

To get all the postcodes for a specific carrier, you can use the following endpoint:

```bash
curl --location 'https://alphadev-api.peddler.com/api/Carriers/{carrier_id}/postcodes' \
--header 'Authorization: Bearer ewFP9DYiDAKedxkcfeCj9Znp0X5WkXOk'
```

### Validate a postcode

To validate a postcode for a specific carrier, you can use the following endpoint:

```bash
curl --location 'https://alphadev-api.peddler.com/api/Carriers/{carrier_id}/postcode?postcode=1066' \
--header 'Authorization: Bearer ewFP9DYiDAKedxkcfeCj9Znp0X5WkXOk'
```

:::note Validation not necessary

Postcode validation is not neccsary since it is implicitly done when you create a shipment.

:::