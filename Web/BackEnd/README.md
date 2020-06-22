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
