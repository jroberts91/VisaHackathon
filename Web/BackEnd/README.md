# Backend API

## api/merchant:
-   GET '/auth' checks the cookie in browser. If logged in, returns  
    -    { _id: req.merchant._id,
    -    success: true,
    -    email: req.merchant.email,
    -    name: req.merchant.name }

- POST '/register' registers new merchants. Cannot have same email from different merchants. If register success, it returns
    - { success: true }

- POST '/login' assigns an authToken to cookie when success. If login success, it returns
    - { success: true
    - merchantId: merchant._id }

- GET 'logout' logs the user out. If logout success, it returns:
    - { success: true }

- POST '/uploadProfileImage' takes in:
    - { files: image_file.jpg/png }
    - if success, it'll return 
    - { success: true }

- POST '/getAll' gets all the merchant. It takes in additional filters like 
    - { order: 'asc'/'desc'
    - sortBy: '_id' etc...
    - filters : object (e.g {rating: 5})
    - searchTerm: 'whatever search term' (based on name, email and description) }
    - and it returns  {merchants(an array of merchant), success: true, postSize: merchants.length}

- GET '/get' get 1 merchant based on merchantId in the params (.../get?id=${merchantId})
    - returns {success: true, merchant: merchant}

## api/product

- POST '/create' creates a new product and store in database. It takes in 
    - {files: array image file
    - name etc.... (based on the scheme) }
    - returns {success: true}

- POST '/getAll' gets all the product. It takes in additional filters like 
    - { order: 'asc'/'desc'
    - sortBy: '_id' etc...
    - filters : object (e.g {price: [1,100]} which means price range from 1-100)
    - searchTerm: 'whatever search term' (based on name and description) }
    - and it returns  {products(an array of product), success: true, postSize: products.length}

- GET '/get' get 1 product based on productId in the params (.../get?id=${productId})
    - returns {success: true, product: product}

- GET '/updateSoldQty' takes in 2 params (.../?id=${productId}&soldQty=${soldQty})
    - returns {success: true, product: product}

- GET '/updateTotalQty' takes in 2 params (.../?id=${productId}&totalQty=${totalQty})
    - returns {success: true, product: product}    

## api/payment

- POST '/direct' makes a payment by creating an order associated with payment, the backend will call and handle push and pull funds transfer (currently with dummy payload)

```json
Request

{
    "order": {
        "merchantId": "5ee9856ede9f8478c570d1ea",
        "product": "5eea319b7d826f0be1dfb429",
        "quantity": 1
    },
    "payment": {
        "address": "def avenue 123",
        "firstName": "yz1",
        "lastName": "ong",
        "phoneNumber": 344345,
        "email": "yz@email.com",
        "postal": "123456",
        "country": "SG"
    }
}

Response

{
    "success": true,
    "orderId": "5ef050a91283634f80882bcc",
    "paymentId": "5ef050a91283634f80882bcb"
}
```

## api/order

- POST '/fulfill' fulfill and order. Fulfilled order will have no changes.

```json
Request

{
    "orderId": "5eef8aeeb6b05d3558610d65"
}

Response

{
    "success": true
}
```
- GET '/get' get single order. (.../get?orderId=${orderId})

```json
Request param

orderId = "5eeb8920418d1752286c9647"

Response

{
    "success": true,
    "order": {
        "_id": "5eeb8920418d1752286c9647",
        "paymentId": "5eeb8920418d1752286c9646",
        "isFulfilled": true,
        "__v": 0,
        "dateTimeFulfilled": "2020-06-19T01:48:35.340Z"
    }
}
```

- GET '/getAll' get all orders. Fulfilled can be left empty which should give all orders.

```json
Request body

{
    "merchantId": "5ee9856ede9f8478c570d1ea",
    "fulfilled": "all" or "fulfilled" or "unfulfilled"
}

Response

{
    "success": true,
    "orders": [
        {
            "_id": "5eef8aeeb6b05d3558610d65",
            "merchantId": "5ee9856ede9f8478c570d1ea",
            "product": {
                "price": 1,
                "images": [
                    "uploads\\\\1592406427633_tc3ZDJF.jpg",
                    "uploads\\\\1592406427661_bhSibUd.jpg"
                ],
                "_id": "5eea319b7d826f0be1dfb429",
                "name": "curry fish",
                "merchantId": "5ee9856ede9f8478c570d1ea",
                "url": "5ee9856ede9f8478c570d1ea\\\\product\\\\5eea319b7d826f0be1dfb429",
                "createdAt": "2020-06-17T15:07:07.748Z",
                "updatedAt": "2020-06-21T16:30:25.890Z",
                "__v": 0
            },
            "quantity": 3,
            "paymentId": "5eef8aeeb6b05d3558610d64",
            "isFulfilled": true,
            "__v": 0,
            "dateTimeFulfilled": "2020-06-21T16:30:25.890Z"
        },
    ],
    "postSize": 1
}
```

## api/offers

- GET '/list' fulfill and order. Fulfilled order will have no changes. Max param shows the max number of orders to be returned(.../get?max=5)

```json
Request param

max = "5"  

Response

TBD

https://developer.visa.com/capabilities/vmorc/reference#vmorc__offers_data_api__v1__retrieve_offers_by_filter
```


