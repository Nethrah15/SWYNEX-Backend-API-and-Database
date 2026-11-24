# SWYNEX Task 2 - Backend API and Database
Project: Expense Tracker API

## Run
npm install
npm start
Server: http://localhost:3000

## API Endpoints
GET /api/expenses - Get all
GET /api/expenses/:id - Get one
POST /api/expenses - Create (title, category, amount, date)
PUT /api/expenses/:id - Update
DELETE /api/expenses/:id - Delete

## Validation
Title required, Category required, Amount must be number > 0
Error: 400 with message, Not Found: 404

## Database Design
Table: expenses (id, title, category, amount, date)
Currently in-memory array, easy to move to MongoDB / SQLite.
