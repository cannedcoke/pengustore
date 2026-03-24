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
- Login with session-based authentication and CSRF protection
- Add, update, and deactivate products
- View all orders with customer email, delivery address, products, and total
- Products are never deleted — they are set to active/inactive

### Customer Store (`/front`)
- Browse active products
- Add items to cart (session-based)
- Cart persists between requests with quantity tracking
- Checkout with email and delivery address
- Stock is automatically reduced on checkout
- Products with 0 stock are automatically deactivated

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Node.js + Express |
| Database | MongoDB + Mongoose |
| Templates | Pug |
| Auth | Session cookies + CSRF |
| Styling | CSS with arctic theme |

## Models

**User** — email, password, role

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

### Environment variables
Create a `.env` file in both `back/` and `front/`:
```
MONGO_URI=mongodb://127.0.0.1:27017/pengustore
SESSION_SECRET=your-secret-here
```

## API Routes

### Dashboard (`back`)
```
POST   /login
DELETE /logout
GET    /dashboard
POST   /dashboard/addProduct
PUT    /dashboard/updateProduct
DELETE /dashboard/removeProduct
```

### Store (`front`)
```
GET    /              → browse products
POST   /addToCart     → add item to session cart
POST   /checkout      → create order and clear cart
```