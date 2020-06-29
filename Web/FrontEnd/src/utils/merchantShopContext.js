import React from 'react';

export const ProductListContext = React.createContext({
  merchantId: '',
  products: [],
  merchantName: '',
  isOwnerShop: false,
  updateProductList: () => {},
});
