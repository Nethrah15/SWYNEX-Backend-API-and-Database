const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let expenses = [
  { id: 1, title: "Lunch", category: "Food", amount: 250, date: "2026-11-24" },
  { id: 2, title: "Train Ticket", category: "Travel", amount: 1200, date: "2026-11-24" }
];
let nextId = 3;

function validateExpense(data) {
  if (!data.title || typeof data.title !== 'string') return "Title is required";
  if (!data.category || typeof data.category !== 'string') return "Category is required";
  if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) return "Amount must be a number > 0";
  return null;
}

app.get('/api/expenses', (req, res) => res.json(expenses));

app.get('/api/expenses/:id', (req, res) => {
  const item = expenses.find(e => e.id == req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

app.post('/api/expenses', (req, res) => {
  const error = validateExpense(req.body);
  if (error) return res.status(400).json({ error });
  const newItem = { id: nextId++, ...req.body };
  expenses.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/expenses/:id', (req, res) => {
  const error = validateExpense(req.body);
  if (error) return res.status(400).json({ error });
  const idx = expenses.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  expenses[idx] = { id: expenses[idx].id, ...req.body };
  res.json(expenses[idx]);
});

app.delete('/api/expenses/:id', (req, res) => {
  expenses = expenses.filter(e => e.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.get('/', (req, res) => res.send("SWYNEX Backend API Running! Try /api/expenses"));

app.listen(3000, () => console.log("Server on http://localhost:3000"));
