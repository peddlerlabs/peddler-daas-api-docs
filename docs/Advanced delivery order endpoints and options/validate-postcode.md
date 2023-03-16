---
sidebar_position: 1
---

# Validate postcode

Also referred to as **Peddler catchment area**

Querying which postcode(s) or postcode are available you can use the "PostcodeRegions" endpoint.
- To query a single postcode you would call the following endpoint with the first 4 numbers as a "string"
  - `GET /api/PostcodeRegions/1066` -> **200** OK (postcode with region) 
  - `GET /api/PostcodeRegions/9999` -> **404** NOT FOUND
  - `GET /api/PostcodeRegions` -> **200** OK -> (list postcodes with region) 
  
## Example postcode request

```js
request
    .get(`/api/PostcodeRegions/${postcode}`) // endpoint
    .set('Authorization', `Bearer ${access_token}`) // header
    .end((err, res) => {
        const error = res.error || err;
        if (error) {
            console.log(error);
        }
        console.log(res);
    });
```

## Example postcode response

```json
{
    "id": "1066",
    "region": "AMSTERDAM"
}
```
