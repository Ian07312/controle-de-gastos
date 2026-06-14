const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'API Controle de Gastos online 🚀' }));
app.use('/expenses', expenseRoutes);

module.exports = app;