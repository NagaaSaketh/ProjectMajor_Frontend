# Fashion Forte

A full-stack e-commerce fashion application that allows users to browse, search, add products to their cart, make purchases, view their order history, and manage their user profile. It is built with a React frontend, an Express/Node backend, and a MongoDB database.

---
## Demo Link

[Demo Link](https://project-major-frontend.vercel.app/)

---

## Login 

> **Guest** <br>
> Username: `guest123@gmail.com` <br> 
> Password: `guest1234`

---

## Quick Start

```
git clone https://github.com/NagaaSaketh/ProjectMajor_Frontend.git
cd ProjectMajor_Frontend
npm install
npm run dev

```
---

## Technologies 

- React JS
- React Router
- Node.js
- Express 
- MongoDB

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app: [Video Link](https://drive.google.com/file/d/1bEH_B2EAkP01FaLJ23Y2rkc9Lw-5VGRp/view?usp=sharing)

---

## Features
**Home**
- Display categories: Men, Women, and Kids.

**User Profile Page**
- Address management
- Naviage through "Profile" & "Orders"

**Categories Page or Product Listing Page**
- Display list of products of each category
- Filters Section 

**Product Details Page**
- Details description of a product
- "Add to Cart" & "Add to Wishlist" buttons 
- "You may be interested in" Section

**Cart Page**
- Display all the products that are added to cart
- Price Details
- Can choose "Preferred Payment Method" & "Address" for delivery. 

---

## API Reference

### **GET /api/categories**
List of all categories
Sample Response 
```
[{_id,categoryImage,category}]
```
### **GET /api/categories/:categoryId**
Get Details for one category
Sample Response 
```
{_id,categoryImage,category}
```
### **GET /api/products**
List of all products
Sample Response 
```
[{_id,productType,productName,productImage,productPrice, ...}]
```
### **GET /api/products/:productId**
Get details for one product
Sample Response 
```
{_id,productType,productName,productImage,productPrice, ...}
```
### **GET /api/products/category/:categoryId**
Get all products of one category
Sample Response 
```
[{_id,productType,productName,productImage,productPrice, ...}]
```
### **GET /api/cart/items**
Get all products in the cart
Sample Response 
```
[{_id,userID,productID,productName,productImage, ...}]
```
### **GET /api/cart/items/:itemId**
Get details for one product from cart.
Sample Response 
```
{_id,userID,productID,productName,productImage, ...}
```
### **GET /api/cart/:userId**
Get all products from cart of one user.
Sample Response 
```
[{_id,userID,productID,productName,productImage, ...}]
```
### **GET /api/wishlist/items/products**
Get all the products from wishlist
Sample Response
```
[{_id,userID,productID,productName,productImage, ...}]
```
### **GET /api/wishlist/:userId**
Get all the products from wishlist of one user.
Sample Response 
```
[{_id,userID,productID,productName,productImage, ...}]
```
### **GET /api/users**
Get all the users
Sample Response 
```
[{_id,fullName,phoneNumber,emailID,dateOfBirth, ...}]
```
### **GET /api/orders**
Get all the orders
Sample Response 
```
[{_id,userID,items:[{...}],address:[{...}],totalAmount, ...}]
```
### **GET /api/orders/:userId**
Get all the orders for one user
Sample Response 
```
[{_id,userID,items:[{...}],address:[{...}],totalAmount, ...}]
```
### **GET /api/addresses**
Get all the addresses
Sample Response 
```
[{_id,userID,street,city,state, ...}]
```
### **GET /api/address/:userId**
Get all the addresses of one user.
Sample Response 
```
[{_id,userID,street,city,state, ...}]
```
### **POST /api/category**
Create a new category
Sample Response 
```
{_id,categoryImage,category}
```
### **POST /api/product**
Create a new product
Sample Response 
```
{_id,productType,productName,productImage,productPrice, ...}
```
### **POST /api/cart**
Create a new cart item
Sample Response 
```
{_id,userID,productID,productName,productImage, ...}
```
### **POST /api/wishlistItems**
Create a new wishlist item
Sample Response 
```
{_id,userID,productID,productName,productImage, ...}
```
### **POST /api/user**
Create a new user
Sample Response 
```
{_id,fullName,phoneNumber,emailID,dateOfBirth, ...}
```
### **POST /api/login**
Logging a user
Sample Response 
```
{email,password}
```
### **POST /api/address**
Create a new address
Sample Response 
```
{_id,userID,street,city,state, ...}
```
### **POST /api/checkout**
Create a new order
Sample Response 
```
{_id,userID,items:[{...}],address:[{...}],totalAmount, ...}
```

### **PUT /api/cart/items/:itemId**
To update a item's quantity in the cart.
Sample Response
```
{_id,userID,productID,productName,productImage, ...}
```
### **PUT /api/user/addresses/address/:id**
To update any address
Sample Response 
```
{_id,userID,street,city,state, ...}
```
### **DELETE /api/wishlist/clear/:userId**
To delete a product from wishlist of one user.
Sample Response
```
{_id,userID,productID,productName,productImage, ...}
```
### **DELETE /api/cart/clear/:userId**
To delete a product from cart of one user.
Sample Response
```
{_id,userID,productID,productName,productImage, ...}
```
### **DELETE /api/items/:itemId**
To delete a product from cart.
Sample Response
```
{_id,productID,productName,productImage, ...}
```
### **DELETE /api/wishlist/items/:itemId**
To delete a product from wishlist.
Sample Response
```
{_id,productID,productName,productImage, ...}
```
### **DELETE /api/user/address/:id**
To delete address
Sample Response 
```
{_id,userID,street,city,state, ...}
```

---

## Contact 

For bugs or feature requests, please reach out to vadlamanisaketh25@gmail.com














