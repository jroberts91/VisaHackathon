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

- GET '/emailExist' takes in 1 param (.../?emai;=${email})
    - returns false if email already exist

- POST '/editProfile' allows merchant to edit product.
    - e.g. req.body = { address: "hogwards", phone:"0238403984"}
    - It will just update the address and phone.
    - Can take it as many fields as the merchant schema

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

- GET '/deleteProduct' changes show:true to show:false based on productId in the params (.../get?id=${productId})
    - returns {success: true}

## api/payment

- POST '/refund' refund the order to the sender (customer)

```json
Request

{
    "orderId": "5ef98d0161520d5d98d59133"
}

Response

{
    "success": true
}

```

- POST '/direct' makes a payment by creating an order associated with payment, the backend will call and handle push and pull funds transfer (currently with dummy payload)

```json
Request

{
    "order": {
        "merchantId": "5ee9856ede9f8478c570d1ea",
        "product": "5ef1a01e1198af414c0d28d4",
        "address": "def avenue 123",
        "phoneNumber": 344345,
        "email": "hello@gmail.com",
        "quantity": 1,
        "code": 12346
    },
    "payment": {
        "firstName": "yz1",
        "lastName": "ong",
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

Offer fully redeemed

{
    "success": false,
    "msg": "offer fully redeemed"
}


```

- POST '/mobile' makes a payment from mobile, all fields are required

```json
Request

{
    "cardNumber": "4000879637857889",
    "expiryDate": "date",
    "cvv": "123",
    "merchantId": "5ee9c93609bd325e5075dc12",
    "cart": [
        {
            "productId": "5ef1a7581198af414c0d28d7",
            "quantity": 3
        },
        {
            "productId": "5ef3094b395e012a64f2dd94",
            "quantity": 1
        }
    ]
}

Response

{
    "success": true
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
        "_id": "5ef2c4b5bcab945c641cfed5",
        "merchantId": "5ee9856ede9f8478c570d1ea",
        "product": {
            "price": 1.7,
            "images": [
                "uploads\\1592893470907_prawns.jpg"
            ],
            "soldQty": 3,
            "_id": "5ef1a01e1198af414c0d28d4",
            "name": "prawns",
            "description": "1.7 per kg",
            "totalQty": 400,
            "merchantId": "5ee9856ede9f8478c570d1ea",
            "createdAt": "2020-06-23T06:24:30.911Z",
            "updatedAt": "2020-06-23T06:24:30.911Z",
            "__v": 0
        },
        "address": "def avenue 123",
        "phoneNumber": "344345",
        "email": "ongyanzhi96@gmail.com",
        "quantity": 1,
        "payment": {
            "_id": "5ef2c4b5bcab945c641cfed4",
            "firstName": "yz1",
            "lastName": "ong",
            "postal": "123456",
            "country": "SG",
            "dateTime": "2020-06-24T03:12:53.698Z",
            "__v": 0
        },
        "isFulfilled": false,
        "__v": 0
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
            "success": true,
            "order": {
                "_id": "5ef2c4b5bcab945c641cfed5",
                "merchantId": "5ee9856ede9f8478c570d1ea",
                "product": {
                    "price": 1.7,
                    "images": [
                        "uploads\\1592893470907_prawns.jpg"
                    ],
                    "soldQty": 3,
                    "_id": "5ef1a01e1198af414c0d28d4",
                    "name": "prawns",
                    "description": "1.7 per kg",
                    "totalQty": 400,
                    "merchantId": "5ee9856ede9f8478c570d1ea",
                    "createdAt": "2020-06-23T06:24:30.911Z",
                    "updatedAt": "2020-06-23T06:24:30.911Z",
                    "__v": 0
                },
                "address": "def avenue 123",
                "phoneNumber": "344345",
                "email": "ongyanzhi96@gmail.com",
                "quantity": 1,
                "payment": {
                    "_id": "5ef2c4b5bcab945c641cfed4",
                    "firstName": "yz1",
                    "lastName": "ong",
                    "postal": "123456",
                    "country": "SG",
                    "dateTime": "2020-06-24T03:12:53.698Z",
                    "__v": 0
                },
                "isFulfilled": false,
                "__v": 0
            }
        }
    ],
    "postSize": 1
}
```

## api/offers

- POST '/add' from postman

```json
Request param

{
    "offerName": "$2 off",
    "code": "12346",
    "merchantId": "5ee9c93609bd325e5075dc12",
    "description": "$2 off, only applicable for items more than $4",
    "offerTitle": "$2 off",
    "value": 2,
    "minValue": 4
}

Response

{
    "success": true
}
```

- POST '/visell/delete' set delete flag to true

```json
Request param

{
    "offerId": "5efad2329a35d96ffc635d89"
}

Response

{
    "success": true
}
```

- GET '/visell/getByMerchant' gets all offers with merchantId

```json
Request param

?merchantId=${merchantId}

Response

{
    "success": true,
    "offers": [
        {
            "_id": "5ef9707b2031074694d6f487",
            "offerName": "$1 off",
            "code": "12345",
            "merchantId": "5ee9856ede9f8478c570d1ea",
            "description": "$1 off, only applicable for items more than $2",
            "offerTitle": "$1 off",
            "value": 1,
            "minValue": 2,
            "merchantName": "kai",
            "__v": 0
        }
    ],
    "postSize": 1
}
```

- GET '/visell/redeem' redeem should be called at payment page

```json
Request param

?merchantId=${merchantId}
?code=${code}

Response

{
    "success": false,
    "msg": "not found"
}

or 

{
    "success": true
}

```

- GET '/list'Max param shows the max number of orders to be returned(.../get?max=5)

```json
Request param

max = "5"  

Response (with max = 1)

{
    "success": true,
    "offers": [
        {
            "_id": "5ef8acf54577ff50a0c81968",
            "programName": "I MEAN BEST OFFER",
            "merchantName": "yz",
            "offerTitle": "50% OFF",
            "redemptionUrl": "http://localhost:3000/5ee9c93609bd325e5075dc12",
            "soldOut": false,
            "merchantImage": "uploads\\1593355509272_1592985442840_yz profile.JPG",
            "__v": 0
        }
    ],
    "postSize": 1
}
```

- GET '/visell/list' return all visell offers

```json

Response 

{
    "success": true,
    "ReturnedResults": 1,
    "TotalFoundResults": 20,
    "Offers": [
        {
            "programName": "VDP Program A",
            "programId": 100740,
            "merchantName": "Merchant One 1",
            "merchantId": 101456,
            "soldOut": false,
            "offerTitle": "Special Event! Limited Ticket Opportunity",
            "validityFromDateTime": "Aug 1, 2016 00:00 GMT",
            "validityToDateTime": "Aug 1, 2020 00:00 GMT",
            "promotionFromDateTime": "Jul 1, 2016 00:00 GMT",
            "promotionToDateTime": "Aug 1, 2020 00:00 GMT",
            "imageList": [
                {
                    "key": 111176,
                    "imageResolution": "Low",
                    "description": "",
                    "fileLocation": "https://www.visa.com/images/merchantoffers/stage/2016-08/1471390034847.offer_image_1170x459.png",
                    "imageFileSize": "7.0 KB",
                    "imageFileHeight": "459 px",
                    "imageFileWidth": "1170 px",
                    "offerImagePromotionChannels": [
                        "Online"
                    ],
                    "offerImagePromotionChannelIds": [
                        3
                    ],
                    "imageAltTag": ""
                }
            ],
            "redemptionUrl": "",
            "redemptionEmail": "",
            "redemptionCode": ""
        }
    ]
}

https://developer.visa.com/capabilities/vmorc/reference#vmorc__offers_data_api__v1__retrieve_offers_by_filter
```



