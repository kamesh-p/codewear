/* eslint-disable import/no-anonymous-default-export */
// pages/api/products.js

export default (req, res) => {
  // Replace this with actual data or database query to fetch products
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 },
  ];

  res.status(200).json(products);
};
