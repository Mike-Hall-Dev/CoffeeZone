# Coffee Zone

A mock ecommerce platform for coffee and coffee accessories.

You can view the deployed version here - https://coffeezoneapp.herokuapp.com/

## Description
This project was built using the MERN stack. It is a mock of a typical eCommerce application. Users can shop for products and even "checkout" with the paypal sandbox implemented. Sign in will be required to checkout, and orders can be viewed/tracked on a users profile. Additional admin pages and functionality are present for authorized users.

## Getting Started

### Dependencies

* You will need to have Node installed on your machine to set this project up locally.

### Clone or Download
```terminal
$ git clone https://github.com/Mike-Hall-Dev/CoffeeZone.git
$ npm i
```
### Running Locally
#### To run both server & client simultaneously
```terminal
$ npm run dev
```
#### To run either client or server by themselves
```terminal
$ npm run client
$ npm run server
```

## Technologies & Features

### Technologies Used
- MongoDB Atlas
- Express
- React
- Node
- React-Bootstrap
- Redux for state management
- Morgan for server logging
- JWT for user authorization
- BcryptJS for user password hashing
- Mongoose for defining models
- React testing library & Jest (soon to come)

### Features
- Fully functional checkout process, product stock count in the database is also updated on successful "purchases"
- Product review system that enables users to rate the products they "purchase"
- Product search functionality
- Global state for cart and user info managed with redux
- User authentication/authorization
- Users are able to view their own order history
- Additional pages/endpoints/functionality for admin users. Admins can view & manage orders, users, and products. They can adjust user permissions, edit product details, add new products, and mark orders as delivered.

### Stretch Goals
- Email order confirmations on successful placement
- Improve the UX overall 
- Implement other payment options/APIs
- Reccomend similar products 
- Improve search functionality
