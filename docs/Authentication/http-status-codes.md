---
sidebar_position: 4
---

# HTTP Status Codes

Peddler API responds with the following status codes in the event of a request succeeding or not.

| **Status Code** | **Response** | **Description** |
|:---:|:---:|:---|
| **200** | `OK` | The request has succeeded. |
| **400** | `BAD_REQUEST` | The request is invalid, contains missing/invalid parameters. |
| **401** | `UNAUTHORIZED` | The request is unauthorised with your current credentials/accessToken.<br />You are using an invalid or non-existent access token. Create a new one. |
| **403** | `FORBIDDEN` | The request is forbidden. <br />You do not have permission to access the requested resource. You do not have permission to access the endpoint |
| **404** | `NOT FOUND` | The requested resource (instance) is not found. |
| **422** | `UNPROCESSABLE_ENTITY` | The request contains validation errors. <br />Details with the errors are available in the response body. |
| **429** | `TOO_MANY_REQUESTS` | You have exceeded the rate limit, further requests should back off until the credit pool is replenished. |
| **498** | `TOKEN_EXPIRED` | The `accessToken` has expired you should generate a new one. |
| **500** | `INTERNAL_SERVER_ERROR` | No error code assigned, something went wrong, our team has been notified. |
| **5xx** | `GATEWAY ERROR` <br />or<br />`SERVER ERROR` | Something went wrong our team has been notified. |


The most common codes experienced are:
- **200** : The request is successful.
- **401** & **498**: You need to renew or refresh your token.
- **422**: The parameters/json data contains validation errors

## Rate limiting
Peddler API rate limits at *2000* requests per minute (this can be applied/omitted per client by special request to the Peddler team).
Should you exceed this rate you will receive a **429** HTTP STATUS.

We recommend throttling your requests, or batching multiple deliveries for any particular store in one order depending on your volume. 
Once you receive a **429** response you must withold for at least 5 minutes.
