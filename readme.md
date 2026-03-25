# Pengustore

# 🐧 Pengustore
A full-stack e-commerce application built with Node.js, Express, MongoDB, and Pug. The project is split into two separate servers — an admin dashboard and a customer-facing store.

## Structure
```
pengustore/
  back/    → admin dashboard server (port 5000)
  front/   → customer store server (port 5001)
```

## Features

### Admin Dashboard (`/back`)
- Login with session-based authentication (cookie + session stored in MongoDB)
- Add, update, and delete products
- View all orders with customer email, delivery address, products, quantities, and total
- Products can be toggled active/inactive via the `active` field

### Customer Store (`/front`)
- Browse active products
- Add items to cart (session-based)
- Cart persists between requests with quantity tracking
- Checkout with email and delivery address
- Stock is automatically reduced on checkout
- Products with 0 stock are automatically deactivated

## Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Server     | Node.js + Express                  |
| Database   | MongoDB + Mongoose                 |
| Templates  | Pug                                |
| Auth       | Session cookies (httpOnly, secure) |
| Styling    | CSS with arctic theme              |

## Models

**User** — email, password

**Product** — name, price, stock, active

**Order** — email, address, products (snapshot of name + price + quantity), timestamps

**Session** — sessionId, userId, expiresAt (TTL index for auto-expiry)

## Getting Started

### Prerequisites
- Node.js
- MongoDB running locally or a MongoDB Atlas URI

### Install and run the dashboard
```bash
cd back
npm install
npm run dev
```

### Install and run the store
```bash
cd front
npm install
npm run dev
```

