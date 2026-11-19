# Library Management System (MongoDB Mini Project)

A full-stack mini project using **Node.js, Express, Mongoose and MongoDB**.

## Features
- Full CRUD on books
- Issue and return books with an atomic stock check
- Text search on title and author
- Dashboard stats using MongoDB aggregation

## Setup
1. Install Node.js and MongoDB (or use MongoDB Atlas).
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI`.
4. `npm run seed` (optional sample data)
5. `npm start` and open http://localhost:3000

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/books?search= | List / search books |
| POST | /api/books | Add a book |
| PUT | /api/books/:id | Update a book |
| DELETE | /api/books/:id | Delete a book |
| POST | /api/books/:id/issue | Issue to a member |
| POST | /api/books/:id/return | Return from a member |
| GET | /api/books/stats | Aggregated stats |

## MongoDB Concepts Used
Schemas, unique and text indexes, embedded documents, `$inc`, `$push`, `$pull`, aggregation pipeline (`$group`, `$sort`).
